import express from "express";
const router = express.Router();
import {
  register,
  login,
  profile,
  logout,
  newPost,
} from "../controller/controller.js";

router.post("/register", register);
router.post("/login", login);
router.get("/profile", profile);
router.post("/logout", logout);
router.post("/newPost", newPost);
export default router;
