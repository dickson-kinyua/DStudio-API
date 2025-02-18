import mongoose from "mongoose";
import PostModel from "../models/postModel.js";

const editPostController = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    // Find the post using the ObjectId
    const postToUpdate = await PostModel.findById(id);

    if (!postToUpdate) {
      return res.status(404).json({ error: "No post found" });
    }

    // Toggle the completed status
    postToUpdate.completed = !postToUpdate.completed;
    await postToUpdate.save();

    res
      .status(200)
      .json({ message: "Post updated successfully", post: postToUpdate });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default editPostController;
