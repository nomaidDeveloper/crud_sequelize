import { Op } from 'sequelize';
import jwt from "jsonwebtoken";
const db = require("../models");
const User = db.users;
import bcrypt from "bcrypt";


export const createUser = async (req, res) => {
  try {
    const { name, email, password,gender,phone } = req.body;

    // Validate required fields
    if (!name || !email || !password && !phone&& !gender) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      gender,
      phone
    };

    const user = await User.create(newUser);

    res.status(201).send({
      message: "User created successfully",
      data:user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed" });
  }
};


// Login (Authenticate user)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create a JWT token for authentication
    const token = jwt.sign({ id: user.id }, "your-secret-key", {
      expiresIn: "8h", // Token expiration time
    });

    res.status(200).json({
      message: "Login successful",
      user:user,
      token:token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};


// ...

export const userList = async (req, res) => {
  try {
   
    const users = await User.findAll({
     
    });

    res.status(200).json({
      message: 'Successful',
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while fetching users' });
  }
};


export const userSearch = async (req, res) => {
  try {
    const { name, email, phone } = req.query;

    const whereClause = {};

    if (name) {
      whereClause.name = { [Op.like]: `%${name}%` };
    }

    if (email) {
      whereClause.email = { [Op.like]: `%${email}%` };
    }

    if (phone) {
      whereClause.phone = { [Op.eq]: phone };
    }

    const users = await User.findAll({
      where: whereClause,
    });

    res.status(200).json({
      message: 'Successful',
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while fetching users' });
  }
};
