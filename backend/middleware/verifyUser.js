import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const verifyUser = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(401).json({ message: "access token not present" });
    }
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "access can not decoded" });
    }

    const user = await User.findById(decoded._id);

    if (!user) return res.status(401).json({ message: "user not found" });
    // if (user.refreshToken !== decoded.refreshToken) {
    //   return res.status(401).json({ message: "Invalid token" });
    // }
    req.user = user;
    next();
  } catch (error) {
    console.error("Err : while verifying user", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export { verifyUser };
