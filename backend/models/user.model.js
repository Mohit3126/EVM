import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    phoneNo: {
      required: true,
      trim: true,
      index: true,
    },
    phoneNo: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    refreshToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    // OTP related fields
    otp: {
      type: String,
    },
    otpExpiresAt: {
      type: Date,
    },
    otpAttempts: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // fixed typo from `timeStamps`
);

//it is a middleware that will run before the every save operation
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  //this line will hash the password before saving it to the database
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.generateOtp = async function () {
  // Generate a secure 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  this.otp = otp;
  this.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

  // Reset attempts if it's a new session
  this.otpAttempts = 0;

  await this.save(); // persist changes

  return otp;
};


// In user model
userSchema.methods.sendEmailOtp = async function (transporter, email, otp) {
const mailOptions = {
  from: process.env.SMTP_USER,
  to: email,
  subject: "Verify your email - OTP Inside",
  text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #333;">Email Verification</h2>
      <p>Hi there,</p>
      <p>Your OTP is: <strong style="font-size: 20px;">${otp}</strong></p>
      <p>This OTP is valid for <strong>10 minutes</strong>.</p>
      <p>If you didn’t request this, please ignore this email.</p>
      <p>To verify your email, please enter this OTP in the application.</p>
      <br/>
      <p>Regards,<br/>Team Avesh</p>
    </div>
  `
};
  await transporter.sendMail(mailOptions);
};


userSchema.methods.isOtpValid = async function (inputOtp) {
  const now = new Date();

  // OTP is either wrong or expired
  if (!this.otp || this.otpExpiresAt < now || this.otp !== inputOtp) {
    this.otpAttempts += 1;
    await this.save();
    return false;
  }

  // OTP is correct and within time
  this.otp = null;
  this.otpExpiresAt = null;
  this.otpAttempts = 0;
  return true;
};

//here i have created the custom method that will check the password is correct or not
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
