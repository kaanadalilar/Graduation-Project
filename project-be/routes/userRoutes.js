import express from "express";

import { saveCoordinates } from "../controllers/userController.js";

const router = express.Router();

router.route("/api/save/coordinates").post(saveCoordinates);

export default router;
