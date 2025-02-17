import mongoose from "mongoose";
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    completed: Boolean,

    author: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("todo", PostSchema);

export default PostModel;
