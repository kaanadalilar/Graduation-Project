import mongoose from "mongoose";

const LocationSchmea = new mongoose.Schema(
    {
        locationName: {
            type: String,
            required: true,
        }
    });

const Location = mongoose.model("Location", LocationSchmea);

export default Location;



