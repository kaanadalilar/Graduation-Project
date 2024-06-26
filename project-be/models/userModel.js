import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        refresh_token: {
            type: String,
            required: false
        },
        role: {
            type: String,
            required: true,
            default: "Customer"
        },
        age: {
            type: Number,
            required: false,
            default: null,
        },
        gender: {
            type: String,
            required: false,
            default: "Unspecified",
        },
        disability: {
            type: String,
            required: false,
            default: "None",
        },
        location: {
            type: String,
            required: false,
            default: "Unspecified",
        },
        picture: {
            type: String,
            required: true,
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        status: {
            type: String,
            required: false,
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);

export default User;