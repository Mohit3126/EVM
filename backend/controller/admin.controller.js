import { Admin } from "../models/admin.model.js";
import { Neta } from "../models/neta.model.js";
import mongoose from "mongoose";


const createAdmin = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const objectId = new mongoose.Types.ObjectId(userId);

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ admin: objectId });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    const newAdmin = await Admin.create({ admin: objectId });

    // Populate and return the new admin
    const populatedAdmin = await Admin.findById(newAdmin._id).populate("admin");

    res.status(201).json({ message: "Admin created", admin: populatedAdmin });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getAdmin = async (req, res) => {
  try {
    const { admin } = req.body;
    const objectId = new mongoose.Types.ObjectId(admin); // Convert to ObjectId
    const createdAdmin = await Admin.findOne({ admin: objectId }).populate(
      "admin"
    );

    res.status(200).json({ message: "OK", createdAdmin });
  } catch (error) {
    console.error("Err while fetching admin", error);

    return res.status(402).json({ message: "Internal server error" });
  }
};

const createLeader = async (req, res) => {
  try {
    const { neta, state, party, electionType,aadhar,age,gender } = req.body;

    if (!req.admin) {
      return res.status(401).json({ message: " Unauthorised request" });
    }

    if (!neta || !state || !party || !electionType,!aadhar) {
      return res.status(401).json({ message: "All feilds are required" });
    }

    const leader = await Neta.create({
      neta,
      party,
      electionType,
      state,
      aadhar,
      age,
      gender
    });

    await leader.save();

    return res
      .status(201)
      .json({ message: "Neta created successfully", leader });
  } catch (error) {
    console.error("Err while creating admin", error);

    return res.status(500).json({ message: "Internal server error " });
  }
};

export { createAdmin, getAdmin, createLeader };
