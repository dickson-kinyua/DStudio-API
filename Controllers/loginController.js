import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { missingInput } from "./missingInputChecker.js";
import { generateToken } from "../Utils/generateToken.js";

const loginController = async (req, res) => {
  const { name, password } = req.body;

  if (missingInput([name, password])) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await UserModel.findOne({ name });

    if (!user) {
      return res.status(400).json({ error: "user does not exist" });
    }

    const passOk = bcrypt.compareSync(password, user.password);

    if (!passOk) {
      return res.status(400).json({ error: "wrong password" });
    }

    generateToken(res, user);
    res.json({ userName: user.name, id: user._id });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default loginController;
