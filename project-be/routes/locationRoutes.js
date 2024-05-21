import express from "express";

import { getLocation, saveLocation } from "../controllers/locationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/get_location").post(protect, getLocation);
router.route("/save_location").post(protect, saveLocation);

export default router;
