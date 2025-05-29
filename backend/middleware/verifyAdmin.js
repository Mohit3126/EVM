import mongoose from "mongoose";

const verifyAdmin = async (req, res, next) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const adminId = new mongoose.Types.ObjectId("6823743b572525500b4acdb1");


  if (!user._id.equals(adminId)) {
    return res.status(403).json({ message: "Forbidden" });
    }

    req.admin = true;
    next();

}


export { verifyAdmin };