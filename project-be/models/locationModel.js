import mongoose from "mongoose";

const AccessibilitySchema = new mongoose.Schema(
    {
        yellowLine: {
            pressedYes: {
                type: Number,
                required: true,
                default: 0,
            },
            pressedNo: {
                type: Number,
                required: true,
                default: 0,
            },
            exists: {
                type: Boolean,
                required: true,
            }
        },
        elevator: {
            pressedYes: {
                type: Number,
                required: true,
                default: 0,
            },
            pressedNo: {
                type: Number,
                required: true,
                default: 0,
            },
            exists: {
                type: Boolean,
                required: true,
            }
        },
        ramp: {
            pressedYes: {
                type: Number,
                required: true,
                default: 0,
            },
            pressedNo: {
                type: Number,
                required: true,
                default: 0,
            },
            exists: {
                type: Boolean,
                required: true,
            }
        },
        toilet: {
            pressedYes: {
                type: Number,
                required: true,
                default: 0,
            },
            pressedNo: {
                type: Number,
                required: true,
                default: 0,
            },
            exists: {
                type: Boolean,
                required: true,
            }
        },
        signLanguage: {
            pressedYes: {
                type: Number,
                required: true,
                default: 0,
            },
            pressedNo: {
                type: Number,
                required: true,
                default: 0,
            },
            exists: {
                type: Boolean,
                required: true,
            }
        },
    },
    { _id: false }
);

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
        accessibility: AccessibilitySchema
    },
    { timestamps: true }
);

LocationSchema.index({ latitude: 1, longitude: 1 }, { unique: true });

const Location = mongoose.model("Location", LocationSchema);

export default Location;