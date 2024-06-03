import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { getAllEmployees, saveEmployee } from "../controllers/employeeController.js";

const router = express.Router();

router.route("/add_employee").post(protect, saveEmployee);
router.route("/get_employees").get(protect, getAllEmployees);

export default router;
