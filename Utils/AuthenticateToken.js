import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// const authenticateToken = (req, res, next) => {
//   const token = req.cookies?.token;

//   if (!token) {
//     return res.status(401).json({ error: "Access Denied. No token provided" });
//   }

//   jwt.verify(token, process.env.SECRET, (error, user) => {
//     if (error) {
//       return res.status(403).json({ error: "Invalid Token" });
//     }

//     req.user = user;
//     next();
//   });
// };
export const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const user = jwt.verify(token, process.env.SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
