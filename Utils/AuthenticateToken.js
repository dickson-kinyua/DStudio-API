import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token;
  // console.log(token);

  if (!token) {
    return res.status(401).json({ error: "Access Denied. No token provided" });
  }

  jwt.verify(token, process.env.SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ error: "Invalid Token" });
    }

    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
  });
};
