import express from "express";

import { getAllLocations, getLocation, saveLocation } from "../controllers/locationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/get_all_locations").get(getAllLocations);
router.route("/get_location").post(getLocation);
router.route("/save_location").post(protect, saveLocation);

export default router;
