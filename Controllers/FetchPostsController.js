import PostModel from "../models/postModel.js";
import mongoose from "mongoose";

export const fetchPosts = async (req, res) => {
  try {
    const userId = req.user?.userId;
    console.log(typeof userId);

    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: No user ID provided" });
    }
    const objectId = new mongoose.Types.ObjectId(userId); // Convert to ObjectId
    const posts = await PostModel.find({ author: objectId }).lean();

    if (!posts.length) {
      return res.status(404).json({ error: "No posts found" });
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
