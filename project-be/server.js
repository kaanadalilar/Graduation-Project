import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import path from "path";
import cors from "cors";

import saveCoordinates from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use("/api/coordinates", saveCoordinates);

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.listen(
    PORT,
    console.log(
        `Server running on port ${PORT}..`.yellow
            .bold
    )
);
