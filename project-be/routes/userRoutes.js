import express from "express";

import { getAllUsers, loginUser, registerUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/getAllUsers").get(protect, getAllUsers);
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

export default router;
