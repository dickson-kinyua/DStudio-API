import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js"; // Assuming the correct path
import jwt from "jsonwebtoken";
import PostModel from "../models/postModel.js";

// Helper function for password validation
const isValidPassword = (password, confirm) => password === confirm;

// Helper function to check if required fields are missing
const missingFields = (fields) => fields.some((field) => !field);

export const register = async (req, res) => {
  const { fullNames, email, password, confirm } = req.body;
  console.log(fullNames, email, password, confirm);

  // Check for missing required fields
  if (missingFields([fullNames, email, password, confirm])) {
    return res
      .status(400)
      .json({ error: "Please fill all the required fields" });
  }

  try {
    // Validate password match
    if (!isValidPassword(password, confirm)) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user already exists
    const ifUserExists = await userModel.findOne({ email });
    if (ifUserExists) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password before saving the user
    const hashedPassword = bcrypt.hashSync(password, 10); // Assuming salt rounds are 10

    // Create new user
    const newUser = await userModel.create({
      fullNames,
      email,
      password: hashedPassword,
    });

    // Check if user creation was successful
    if (!newUser) {
      return res
        .status(400)
        .json({ error: "Failed to create user, please try again" });
    }

    // Respond with the created user
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (missingFields([email, password])) {
    return res
      .status(400)
      .json({ error: "Please fill all the required fields" });
  }
  try {
    const userExist = await userModel.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const passOk = bcrypt.compareSync(password, userExist.password);

    if (!passOk) {
      return res.status(400).json({ error: "Wrong password" });
    }

    jwt.sign(
      { email, id: userExist._id },
      process.env.SECRET,
      {},
      (error, token) => {
        if (error) throw error;
        res.cookie("token", token).json(userExist);
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const profile = async (req, res) => {
  const token = req.cookies?.token; // Ensure we access `token` safely

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const userInfo = jwt.verify(token, process.env.SECRET); // Verify token synchronously
    return res.status(200).json(userInfo);
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    console.error("Error verifying token:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "").json({ message: "Logout Successful" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const newPost = async (req, res) => {
  const { title, author, description, date } = req.body;

  if (missingFields([title, author, description, date])) {
    return res
      .status(400)
      .json({ error: "Please fill all the required fields" });
  }

  try {
    const data = await PostModel.create({ title, author, description, date });

    if (!data) {
      return res.status(400).json({ error: "Try again" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
