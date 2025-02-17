import express from "express";

import { createPost } from "../Controllers/NewPostController.js";
import { fetchPosts } from "../Controllers/FetchPostsController.js";
import { deletePost } from "../Controllers/DeletePostController.js";
import { deleteAllPosts } from "../Controllers/DeleteAllPostsController.js";
import editPostController from "../Controllers/EditPostController.js";
import registerUser from "../Controllers/registerUserController.js";
import loginController from "../Controllers/loginController.js";
import { logout } from "../Controllers/LogoutController.js";
import { authenticateToken } from "../Utils/AuthenticateToken.js";

const router = express.Router();

router.post("/createPost", authenticateToken, createPost);
router.get("/fetchPosts", authenticateToken, fetchPosts);
router.delete("/deletePost/:id", deletePost);
router.delete("/deleteAllPosts", deleteAllPosts);
router.put("/editPost/:id", editPostController);
router.post("/register", registerUser);
router.post("/login", loginController);
router.post("/logout", logout);

export default router;
