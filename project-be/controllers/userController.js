import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import dotenv from "dotenv";

dotenv.config();

const getAllCustomers = asyncHandler(async (req, res) => {
    try {
        const customers = await User.find({ role: "Customer" });
        res.status(200).json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to retrieve customers.");
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to retrieve users.");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            role: user.role,
            age: user.age,
            gender: user.gender,
            disability: user.disability,
            location: user.location,
            picture: user.picture,
            status: user.status,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: "Invalid Email or Password" });
        throw new Error("Invalid Email or Password");
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(409).json({ message: "Email is already used" });
        throw new Error("Email is already used");
    }

    const user = await User.create({
        name: name,
        email: email,
        password: password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            picture: user.picture,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});

export { getAllCustomers, getAllUsers, loginUser, registerUser };