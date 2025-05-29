import { Admin } from "../models/admin.model.js";
import { Neta } from "../models/neta.model.js";

const createAdmin = async (req, res) => {
  const { admin } = req.body;

  const objectId = new mongoose.Types.ObjectId(admin); // Convert to ObjectId
  const createdAdmin = await Admin.findOne({ admin: objectId }).populate(
    "admin"
  );

  res.status(200).json({ message: "OK", createdAdmin });
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
