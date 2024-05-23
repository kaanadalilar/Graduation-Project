import asyncHandler from "express-async-handler";
import Location from "../models/locationModel.js";
import dotenv from "dotenv";

dotenv.config();

const getAllLocations = asyncHandler(async (req, res) => {
    try {
        const locations = await Location.find({}).select('locationName longitude latitude');
        res.status(200).json(locations);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to retrieve locations.");
    }
});

const getLocation = asyncHandler(async (req, res) => {
    const { locationName, longitude, latitude } = req.body;

    try {
        const location = await Location.findOne({
            locationName,
            longitude,
            latitude,
        });

        if (location) {
            res.status(200).json(location);
        } else {
            res.status(204).send('Location not found!');
        }
    } catch (error) {
        res.status(500).send('Failed to retrieve the location!');
    }
});

const saveLocation = asyncHandler(async (req, res) => {
    const { locationName, longitude, latitude, comments } = req.body;

    try {
        let existingLocation = await Location.findOne({ locationName, latitude, longitude });

        if (existingLocation) {
            existingLocation.comments.push(...comments);
            await existingLocation.save();
            res.status(200).send("Location comments updated!");
        }
        else {
            const newLocation = new Location({
                locationName,
                longitude,
                latitude,
                comments,
            });
            await newLocation.save();
            res.status(200).send("Location is added!");
        }
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send("A location with these coordinates already exists.");
        }
        else {
            res.status(400).send("Failed to add or update the location.");
        }
    }
});

export { getAllLocations, getLocation, saveLocation };