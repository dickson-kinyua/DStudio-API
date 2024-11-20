import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullNames: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = new mongoose.model("user", userSchema);

export default userModel;
