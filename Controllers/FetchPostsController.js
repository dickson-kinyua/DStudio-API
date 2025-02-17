import mongoose from "mongoose";
import PostModel from "../models/PostModel.js";
import jwt from "jsonwebtoken";

export const fetchPosts = async (req, res) => {
  const userId = req.user?.userId;

  try {
    const posts = await PostModel.find({ author: userId });

    if (posts.length === 0) {
      return res.status(404).json({ error: "No posts found" });
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
