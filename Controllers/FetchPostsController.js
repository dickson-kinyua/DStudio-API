import PostModel from "../models/postModel.js";

export const fetchPosts = async (req, res) => {
  try {
    const userId = req.user?.userId;
    console.log(userId);

    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: No user ID provided" });
    }

    const posts = await PostModel.find({ author: userId }).lean();
    console.log("Posts found:", posts); // Debugging

    if (!posts.length) {
      return res.status(404).json({ error: "No posts found" });
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
