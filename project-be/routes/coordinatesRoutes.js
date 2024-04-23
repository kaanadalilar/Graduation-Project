import express from "express";

import { saveCoordinates } from "../controllers/coordinatesController.js";

const router = express.Router();

router.route("/add").post(saveCoordinates);

export default router;
