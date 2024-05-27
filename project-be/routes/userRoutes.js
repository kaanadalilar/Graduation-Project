import express from "express";

import { getAllCustomers, getAllUsers, loginUser, registerUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/get_all_customers").get(protect, getAllCustomers);
router.route("/get_all_users").get(protect, getAllUsers);
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

export default router;
