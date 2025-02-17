import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (res, user) => {
  const token = jwt.sign(
    { userId: user._id, userName: user.name }, //payload
    process.env.SECRET, //secret key
    { expiresIn: "7d" } // Token expiration
  );
  // ✅ Set token in HTTP-Only Cookie
  res.cookie("token", token, {
    httpOnly: true, // Prevent JavaScript access
    secure: true, // Use HTTPS
    sameSite: "None", // Allow cross-origin requests
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};
