import jwt from "jsonwebtoken";

const generateToken = (id) => {
    console.log(process.env.JWT_TOKEN)
    return jwt.sign({ id }, process.env.JWT_TOKEN, {
        expiresIn: "30d",
    });
};

export default generateToken;