import mongoose from "mongoose";

const CoordinatesSchema = new mongoose.Schema(
    {
        coordinateName: {
            type: String,
            required: true,
        }
    });

const Coordinates = mongoose.model("Coordinates", CoordinatesSchema);

export default Coordinates;



