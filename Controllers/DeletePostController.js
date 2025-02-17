import PostModel from "../models/postmodel.js";

export const deletePost = async (req, res) => {
  const id = req.params?.id;
  try {
    const postToDelete = await PostModel.findByIdAndDelete(id);

    if (!postToDelete) {
      return res.status(400).json({ error: "post not found" });
    }

    res.status(200).json("deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "internal server error" });
  }
};
