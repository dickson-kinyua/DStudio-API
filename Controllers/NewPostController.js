import PostModel from "../models/postmodel.js";
import { missingInput } from "./missingInputChecker.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createPost = async (req, res) => {
  const { todo, priority } = req.body;
  const userId = req.user?.userId; // Ensure req.user is available

  if (missingInput([todo, priority])) {
    return res.status(400).json({ error: "Please fill in all the fields" });
  }

  try {
    const newPost = await PostModel.create({
      todo,
      priority,
      completed: false,
      author: userId,
    });
    if (!newPost) {
      return res.status(401).json({ error: "could not create post" });
    }
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};
