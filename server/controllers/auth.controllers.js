import db from "../model/index.js";
import authconfig from "../config/auth.config.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const User = db.User;
const authController = {};

authController.register = async (req, res) => {
  const { type, name, email, password, school, phone} = req.body;
  try {
    // Check Validate required fields
    if(!email || !password || !name || !type) {
      return res.status(400).send({ message: "email, password, type and name are required!" });
    }
    
    // Validate user type
    const allowedTypes = ['admin', 'teacher', 'jude'];
    if (!allowedTypes.includes(type)) {
      return res.status(400).send({ message: "Invalid user type. Allowed types are: admin, teacher, jude." });
    }
    
    // Validate additional fields for teacher
    if (type === 'teacher' && (!school || !phone)) {
      return res.status(400).send({ message: "School and phone are required for teacher!" });
    }
    
    // Check for duplicate email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ message: "Email is already in use!" });
    }
    
    // Create user object
    const newUser = {
      username: email, // Using email as username since it's required
      name,
      email,
      password,
      type,
    };
    
    if (type === 'teacher') {
      newUser.school = school;
      newUser.phone = phone;
    }
    
    // Create user in database
    const user = await User.create(newUser);

    // If user is teacher, create a verification token
    if (type === 'teacher') {
      try {
        const token = crypto.randomBytes(32).toString('hex');
        await db.VerificationToken.create({
          token,
          userId: user.id,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });
        console.log(`Verification token for ${user.email}: ${token}`);
      } catch (error) {
        console.error("Error creating verification token:", error);
      }
    }

    res.status(201).send({ 
      message: user.type === 'teacher' ? 
        "Teacher was registered successfully! Please check your email to verify" :
        "User was registered successfully!",
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        type: user.type,
        ...(user.type === 'teacher' && { isVerified: user.isVertified })
      }
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Something went wrong while creating the user" });
  }
};

export default authController;