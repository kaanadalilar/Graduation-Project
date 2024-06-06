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
    const { locationName, longitude, latitude, accessibilityInfo, pressed, username } = req.body;

    try {
        let existingLocation = await Location.findOne({ locationName, latitude, longitude });

        if (existingLocation) {
            if (accessibilityInfo === "yellowLine" || accessibilityInfo === "elevator" || accessibilityInfo === "ramp" || accessibilityInfo === "toilet" || accessibilityInfo === "signLanguage") {
                const accessibilityType = existingLocation.accessibility[accessibilityInfo];
                if (pressed === "Yes") {
                    accessibilityType.pressedYes++;
                    accessibilityType.votedUsers.push(username);
                } else {
                    accessibilityType.pressedNo++;
                    accessibilityType.votedUsers.push(username);
                }

                if (accessibilityType.pressedYes > accessibilityType.pressedNo) {
                    accessibilityType.exists = true;
                } else {
                    accessibilityType.exists = false;
                }
            }

            await existingLocation.save();
            res.status(200).send("Location accessibility info is updated!");
        }
        else {
            let votedUsersArray = [];
            votedUsersArray.push(username)
            const newLocation = new Location({
                locationName,
                longitude,
                latitude,
                accessibility: {
                    yellowLine: {
                        pressedYes: accessibilityInfo === "yellowLine" && pressed === "Yes" ? 1 : 0,
                        pressedNo: accessibilityInfo === "yellowLine" && pressed === "No" ? 1 : 0,
                        exists: accessibilityInfo === "yellowLine" && pressed === "Yes" ? true : false,
                        votedUsers: accessibilityInfo === "yellowLine" ? [username] : [],
                    },
                    elevator: {
                        pressedYes: accessibilityInfo === "elevator" && pressed === "Yes" ? 1 : 0,
                        pressedNo: accessibilityInfo === "elevator" && pressed === "No" ? 1 : 0,
                        exists: accessibilityInfo === "elevator" && pressed === "Yes" ? true : false,
                        votedUsers: accessibilityInfo === "elevator" ? [username] : [],
                    },
                    ramp: {
                        pressedYes: accessibilityInfo === "ramp" && pressed === "Yes" ? 1 : 0,
                        pressedNo: accessibilityInfo === "ramp" && pressed === "No" ? 1 : 0,
                        exists: accessibilityInfo === "ramp" && pressed === "Yes" ? true : false,
                        votedUsers: accessibilityInfo === "ramp" ? [username] : [],
                    },
                    toilet: {
                        pressedYes: accessibilityInfo === "toilet" && pressed === "Yes" ? 1 : 0,
                        pressedNo: accessibilityInfo === "toilet" && pressed === "No" ? 1 : 0,
                        exists: accessibilityInfo === "toilet" && pressed === "Yes" ? true : false,
                        votedUsers: accessibilityInfo === "toilet" ? [username] : [],
                    },
                    signLanguage: {
                        pressedYes: accessibilityInfo === "signLanguage" && pressed === "Yes" ? 1 : 0,
                        pressedNo: accessibilityInfo === "signLanguage" && pressed === "No" ? 1 : 0,
                        exists: accessibilityInfo === "signLanguage" && pressed === "Yes" ? true : false,
                        votedUsers: accessibilityInfo === "signLanguage" ? [username] : [],
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
                accessibility: {
                    yellowLine: {
                        pressedYes: 0,
                        pressedNo: 0,
                        exists: false,
                        votedUsers: [],
                    },
                    elevator: {
                        pressedYes: 0,
                        pressedNo: 0,
                        exists: false,
                        votedUsers: [],
                    },
                    ramp: {
                        pressedYes: 0,
                        pressedNo: 0,
                        exists: false,
                        votedUsers: [],
                    },
                    toilet: {
                        pressedYes: 0,
                        pressedNo: 0,
                        exists: false,
                        votedUsers: [],
                    },
                    signLanguage: {
                        pressedYes: 0,
                        pressedNo: 0,
                        exists: false,
                        votedUsers: [],
                    },
                },
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