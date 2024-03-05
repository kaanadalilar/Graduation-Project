import asyncHandler from "express-async-handler";
import Coordinates from "../models/coordinatesModel.js";
import dotenv from "dotenv";

dotenv.config();

const saveCoordinates = asyncHandler(async (req, res) => {
    const { coordinateName } = req.body;
    try {
        let coordinates = await new Coordinates({
            coordinateName: coordinateName,
        });
        await coordinates.save();
        res.status(200).send("Coordinates are added!");
    } catch {
        res.status(400).send("Failed to add Coordinates.");
    }
});

export { saveCoordinates };
