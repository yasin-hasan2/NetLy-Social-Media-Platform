import express from "express";
import {
  editProfile,
  followOrUnfollowUser,
  getProfile,
  getSuggestedUsers,
  login,
  logout,
  registerUser,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/:id/profile").get(isAuthenticated, getProfile);
router
  .route("/profile/edit")
  .post(isAuthenticated, upload.single("profilePicture"), editProfile);
router.route("/suggested").get(isAuthenticated, getSuggestedUsers);
router
  .route("/followorunfollow/:id")
  .post(isAuthenticated, followOrUnfollowUser);

export default router;
// This code defines the user-related routes for the application.
