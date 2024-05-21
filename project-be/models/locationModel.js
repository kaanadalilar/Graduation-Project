import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const LocationSchema = new mongoose.Schema(
    {
        locationName: {
            type: String,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
        comments: [CommentSchema],
    },
    { timestamps: true }
);

LocationSchema.index({ latitude: 1, longitude: 1 }, { unique: true });

const Location = mongoose.model("Location", LocationSchema);

export default Location;