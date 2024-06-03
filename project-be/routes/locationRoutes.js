import express from "express";

import { getAllLocations, getLocation, updateLocation, saveLocation } from "../controllers/locationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/get_all_locations").get(getAllLocations);
router.route("/get_location").post(getLocation);
router.route("/update_location").post(updateLocation);
router.route("/save_location").post(protect, saveLocation);

export default router;
