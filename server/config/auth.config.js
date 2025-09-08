import dotenv from "dotenv";
dotenv.config();

const authconfig = {
    secret: process.env.JWT_SECRET,
};

export default authconfig;