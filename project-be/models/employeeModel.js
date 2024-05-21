import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        hireDate: {
            type: Date,
            required: true,
        },
        reportsTo: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: true,
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
    },
    {
        timestamps: true,
    }
);

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;