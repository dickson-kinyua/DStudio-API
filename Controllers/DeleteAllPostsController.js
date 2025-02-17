import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import PostModel from "../models/postModel.js";

export const deleteAllPosts = async (req, res) => {
  try {
    const token = req.cookies?.token;
    console.log(token);
    jwt.verify(token, process.env.SECRET, {}, async (error, user) => {
      if (error) throw error;
      const deletepost = await PostModel.deleteMany({
        // author: user.userId,
      });
      //   console.log(userInfo);
      if (!deletepost) {
        return res.status(400).json({ error: "could not delete posts" });
      }
      res.status(200).json("deleted");
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "internal server error" });
  }
};
