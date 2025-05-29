import { Router } from "express";

import {
  loginUser,
  sendOtp,
  getAllNeta,
  getUser,
  getUserFromId,
  getNetaFromId,
  registerVote,
  hasVoted,
  logoutUser,
  verifyOtp,
} from "../controller/user.controller.js";
import {
  getAdmin,
  createAdmin,
  createLeader,
} from "../controller/admin.controller.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { verifyUser } from "../middleware/verifyUser.js";
const router = Router();

router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.post("/login", loginUser);
router.get("/getAdmin", getAdmin);

router.get("/logout",verifyUser,logoutUser);

router.post("/vote",verifyUser,registerVote);
router.post("/hasVoted",verifyUser,hasVoted);
router.get("/getUser", verifyUser, getUser);

router.get("/getNeta/:netaId", verifyUser, getNetaFromId);
router.get("/getUser/:userId", verifyUser, getUserFromId);
router.get("/home", verifyUser, getAllNeta);
router.post("/createLeader", verifyUser, verifyAdmin, createLeader);

export { router };
