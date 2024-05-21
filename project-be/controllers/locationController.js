import asyncHandler from "express-async-handler";
import Location from "../models/locationModel.js";
import dotenv from "dotenv";

dotenv.config();

const saveLocation = asyncHandler(async (req, res) => {
    const { location } = req.body;
    try {
        let newLocation = await new Location({
            locationName: location,
        });
        await newLocation.save();
        res.status(200).send("Location is added!");
    } catch {
        res.status(400).send("Failed to add the location.");
    }
});

export { saveLocation };
