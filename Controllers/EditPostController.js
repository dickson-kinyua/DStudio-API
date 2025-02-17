import mongoose from "mongoose";
import PostModel from "../models/postModel.js";

const editPostController = async (req, res) => {
  const id = req.params?.id;

  // console.log(typeof id);
  const Id = new mongoose.Types.ObjectId(id);
  // console.log(Id);

  try {
    const postToUpdate = await PostModel.findOne({ _id: id }, [
      //   { $set: { completed: { $not: "$completed" } } },
    ]);
    postToUpdate.completed = !postToUpdate.completed;
    await postToUpdate.save();
    // console.log(postToUpdate.completed);

    if (!postToUpdate) {
      return res.status(400).json({ error: "no post found" });
    }

    res.status(201).json("ok");
    // console.log(postToUpdate);
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

export default editPostController;
