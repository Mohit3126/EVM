import { User } from "../models/user.model.js";
import { Neta } from "../models/neta.model.js";
import { Vote } from "../models/vote.model.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
const sendOtp = async (req, res) => {
  try {
    const { name, email, phoneNo, password } = req.body;
    if (!name || !email || !phoneNo || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Phone number length & digit check
    if (!/^\d{10}$/.test(phoneNo)) {
      return res
        .status(400)
        .json({ message: "Phone number must be exactly 10 digits" });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Password strength check (optional but good)
    if (password.length <= 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }


    const createdUser = await User.create({
      name,
      email,
      phoneNo,
      password,
    });

    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    
    
    const otp = await createdUser.generateOtp();
     await createdUser.sendEmailOtp(transporter, createdUser.email, otp);

    return res.status(201).json({message : "OTP sent to your email", email: createdUser.email});
   
  } catch (error) {
    console.log("Err while sending otp", error.errmsg);
    res.status(500).json({ message: "Internal Server error", error: error.errmsg });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check attempts before validating OTP
    if (user.otpAttempts >= 3) {
      return res.status(429).json({ message: "Too many attempts, please try again later" });
    }

    const isValidOtp = user.isOtpValid(otp);

    if (!isValidOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Success: mark user as verified and reset fields
    user.isVerified = true;
    await user.save();



    return res.status(200).json({ message: "OTP verified successfully", user });

  } catch (error) {
    console.error("Error while verifying OTP:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All feilds are required" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length <= 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "user not found " });
    if (!user.isPasswordCorrect(user.password)) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res
      .status(200)
      .json({ message: "User logged in successfully", user });
  } catch (error) {
    console.error("Err: while logging user", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("accessToken", { sameSite: "none", secure: true });
    res.clearCookie("refreshToken", { sameSite: "none", secure: true });
    const user = await User.findById(req.user._id);
    user.refreshToken = null;
    await user.save();
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllNeta = async (req, res) => {
  try {
    const leaders = await Neta.find();
    if (leaders.length === 0) {
      return res.send(401).json({ message: "No neta found" });
    }
    return res.status(200).json({ message: "fetched all leaders", leaders });
  } catch (error) {
    console.error("Err while fetching all Neta", error);

    res.status(501).json({ message: "Internal server error " });
  }
};

const getUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: " please login to continue" });
    }
    const user = req.user;
  
    return res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    console.error("Err : while getting user",error);

    return res.status(500).json({message:"internal server error "})
  }
};

const getUserFromId = async (req, res) => {
  try {
    const { userId } = req.params;
    const isValid =mongoose.Types.ObjectId.isValid(userId);
    if (!isValid) {
      return res.status(400).json({ message: "Not a valid id" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    return res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    console.error("Err: while fetching user from id", error);
  }
};

const getNetaFromId = async (req, res) => {
  try {
    const { netaId } = req.params;
    if (!netaId) {
      return res.status(400).json({ message: "the should be present" });
    }
    const isValid = mongoose.Types.ObjectId.isValid(netaId);
    if (!isValid) return res.status(400).json({ message: "not a valid id" });
    const leader = await Neta.findById(netaId);

    if (!leader) {
      return res.status(404).json({ message: "User not found !" });
    }
    return res
      .status(200)
      .json({ message: "Leader fetched successfully", leader });
  } catch (error) {
    console.error("Err while getting neta from id", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const registerVote = async (req, res) => {
  try {
    console.log("register vote called");
    const { voterId, netaId, electionType } = req.body;

    if (!voterId || !netaId || !electionType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user has already voted in this election type
    const alreadyVoted = await Vote.findOne({ voterId, electionType });
    if (alreadyVoted) {
      return res.status(409).json({ message: "User has already voted in this election type" });
    }

    // Optional: (Security) Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(voterId) || !mongoose.Types.ObjectId.isValid(netaId)) {
      return res.status(400).json({ message: "Invalid voterId or netaId" });
    }

    const vote = new Vote({ voterId, netaId, electionType });
    await vote.save();

    return res.status(201).json({ message: "Vote registered successfully", vote });
  } catch (error) {
    console.error("Error while registering vote", error);

    // Handle unique constraint error gracefully
    if (error.code === 11000) {
      return res.status(409).json({ message: "Duplicate vote detected" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
// GET or POST: /api/hasVoted
const hasVoted = async (req, res) => {
  try {
    const { voterId, electionType } = req.body;

    if (!voterId || !electionType) {
      return res.status(400).json({ message: "Missing voterId or electionType" });
    }

    const vote = await Vote.findOne({ voterId, electionType });

    return res.status(200).json({ hasVoted: !!vote });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


export {
  sendOtp,
  verifyOtp,
  loginUser,
  getAllNeta,
  getUser,
  getUserFromId,
  getNetaFromId,
  registerVote,
  hasVoted,
  logoutUser,
};
