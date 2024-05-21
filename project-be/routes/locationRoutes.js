import express from "express";

import { saveLocation } from "../controllers/locationController.js";

const router = express.Router();

router.route("/add").post(saveLocation);

export default router;
