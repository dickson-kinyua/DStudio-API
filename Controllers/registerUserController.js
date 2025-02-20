import UserModel from "../models/userModel.js";
import { missingInput } from "./missingInputChecker.js";
import { generateToken } from "../Utils/generateToken.js";

import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(12);

const registerUser = async (req, res) => {
  const { name, password } = req.body;
  if (missingInput([name, password])) {
    return res.status(401).json({ error: "All the fields are required" });
  }

  try {
    const userExist = await UserModel.findOne({ name });
    if (userExist) {
      return res.status(400).json({ error: "user already registered" });
    }
    const newUser = await UserModel.create({
      name,
      password: bcrypt.hashSync(password, salt),
    });

    if (!newUser) {
      return res.status(401).json({ error: "User not created" });
    }

    generateToken(res, newUser);
    res.json({ userName: newUser.name, id: newUser._id });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

export default registerUser;
