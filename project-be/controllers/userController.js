import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import dotenv from "dotenv";

dotenv.config();

const saveCoordinates = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const user = await User.create({
        name: name
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            isAdmin: user.isAdmin,
            role: user.role,
            verified: user.verified,
            licence: user.licence,
            banned: user.banned,
            subscribed: user.subscribed,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});

export { saveCoordinates };
