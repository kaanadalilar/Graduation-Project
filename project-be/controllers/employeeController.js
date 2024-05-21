import asyncHandler from "express-async-handler";
import Employee from "../models/employeeModel.js";
import dotenv from "dotenv";

dotenv.config();

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
};

const getAllEmployees = asyncHandler(async (req, res) => {
    try {
        const employees = await Employee.find({});

        const formattedEmployees = employees.map(employee => {
            return {
                ...employee._doc,
                hireDate: formatDate(employee.hireDate)
            };
        });

        res.status(200).json(formattedEmployees);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to retrieve employees.");
    }
});



const saveEmployee = asyncHandler(async (req, res) => {
    const { employeeInfo } = req.body;
    console.log(employeeInfo)
    try {
        let employee = await new Employee({
            name: employeeInfo.name,
            designation: employeeInfo.designation,
            country: employeeInfo.country,
            hireDate: employeeInfo.hireDate,
            reportsTo: employeeInfo.reportsTo,
            id: employeeInfo.id,
            picture: employeeInfo.picture,
        });
        await employee.save();
        res.status(200).send("Employee is added!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to create an employee.");
    }
});

export { getAllEmployees, saveEmployee };
