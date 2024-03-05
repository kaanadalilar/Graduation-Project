import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import colors from "colors";

import coordinatesRoutes from "./routes/coordinatesRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/coordinates", coordinatesRoutes);

const PORT = process.env.PORT || 4000;

app.listen(
    PORT,
    console.log(
        `Server running on port ${PORT}..`.yellow
            .bold
    )
);
