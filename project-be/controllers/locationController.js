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

const updateLocation = asyncHandler(async (req, res) => {
    const { locationName, longitude, latitude, accessibilityInfo, pressed } = req.body;

    try {
        let existingLocation = await Location.findOne({ locationName, latitude, longitude });

        if (existingLocation) {
            if (accessibilityInfo === "yellowLine") {
                if (pressed === "Yes") {
                    existingLocation.accessibility.yellowLine.pressedYes++;
                } else {
                    existingLocation.accessibility.yellowLine.pressedNo++;
                }
                if (existingLocation.accessibility.yellowLine.pressedYes > existingLocation.accessibility.yellowLine.pressedNo) {
                    existingLocation.accessibility.yellowLine.exists = true;
                }
                else {
                    existingLocation.accessibility.yellowLine.exists = false;
                }
            }
            else if (accessibilityInfo === "elevator") {
                if (pressed === "Yes") {
                    existingLocation.accessibility.elevator.pressedYes++;
                } else {
                    existingLocation.accessibility.elevator.pressedNo++;
                }
                if (existingLocation.accessibility.elevator.pressedYes > existingLocation.accessibility.elevator.pressedNo) {
                    existingLocation.accessibility.elevator.exists = true;
                }
                else {
                    existingLocation.accessibility.elevator.exists = false;
                }
            }
            else if (accessibilityInfo === "ramp") {
                if (pressed === "Yes") {
                    existingLocation.accessibility.ramp.pressedYes++;
                } else {
                    existingLocation.accessibility.ramp.pressedNo++;
                }
                if (existingLocation.accessibility.ramp.pressedYes > existingLocation.accessibility.ramp.pressedNo) {
                    existingLocation.accessibility.ramp.exists = true;
                }
                else {
                    existingLocation.accessibility.ramp.exists = false;
                }
            }
            else if (accessibilityInfo === "toilet") {
                if (pressed === "Yes") {
                    existingLocation.accessibility.toilet.pressedYes++;
                } else {
                    existingLocation.accessibility.toilet.pressedNo++;
                }
                if (existingLocation.accessibility.toilet.pressedYes > existingLocation.accessibility.toilet.pressedNo) {
                    existingLocation.accessibility.toilet.exists = true;
                }
                else {
                    existingLocation.accessibility.toilet.exists = false;
                }
            }
            else if (accessibilityInfo === "signLanguage") {
                if (pressed === "Yes") {
                    existingLocation.accessibility.signLanguage.pressedYes++;
                } else {
                    existingLocation.accessibility.signLanguage.pressedNo++;
                }
                if (existingLocation.accessibility.signLanguage.pressedYes > existingLocation.accessibility.signLanguage.pressedNo) {
                    existingLocation.accessibility.signLanguage.exists = true;
                }
                else {
                    existingLocation.accessibility.signLanguage.exists = false;
                }
            }
            await existingLocation.save();
            res.status(200).send("Location accessibility info is updated!");
        }
        else {
            const newLocation = new Location({
                locationName,
                longitude,
                latitude,
                accessibility: {
                    yellowLine: {
                        pressedYes: accessibilityInfo === "yellowLine" && pressed === "Yes" ? 1 : 0,
                        pressedNo: accessibilityInfo === "yellowLine" && pressed === "No" ? 1 : 0,
                        exists: accessibilityInfo === "yellowLine" && pressed === "Yes" ? true : false,
                    },
                    elevator: {
                        pressedYes: accessibilityInfo === "elevator" && pressed === "Yes" ? 1 : 0,
                        pressedNo: accessibilityInfo === "elevator" && pressed === "No" ? 1 : 0,
                        exists: accessibilityInfo === "elevator" && pressed === "Yes" ? true : false,
                    },
                    ramp: {
                        pressedYes: accessibilityInfo === "ramp" && pressed === "Yes" ? 1 : 0,
                        pressedNo: accessibilityInfo === "ramp" && pressed === "No" ? 1 : 0,
                        exists: accessibilityInfo === "ramp" && pressed === "Yes" ? true : false,
                    },
                    toilet: {
                        pressedYes: accessibilityInfo === "toilet" && pressed === "Yes" ? 1 : 0,
                        pressedNo: accessibilityInfo === "toilet" && pressed === "No" ? 1 : 0,
                        exists: accessibilityInfo === "toilet" && pressed === "Yes" ? true : false,
                    },
                    signLanguage: {
                        pressedYes: accessibilityInfo === "signLanguage" && pressed === "Yes" ? 1 : 0,
                        pressedNo: accessibilityInfo === "signLanguage" && pressed === "No" ? 1 : 0,
                        exists: accessibilityInfo === "signLanguage" && pressed === "Yes" ? true : false,
                    },
                },
                comments: [],
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

export { getAllLocations, getLocation, updateLocation, saveLocation };