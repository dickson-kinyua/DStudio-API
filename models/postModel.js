import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true, // Adjust if date is mandatory
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const PostModel = mongoose.model("Form", PostSchema);

export default PostModel;
