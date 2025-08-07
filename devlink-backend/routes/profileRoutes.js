import { Router } from "express";
import {
  getMyProfile,
  createOrUpdateProfile,
  getProfileByUserId,
} from "../controllers/profileController.js";
import authenticate from "../middlewares/authMiddleware.js";

const profileRouter = Router();

// @route   GET /api/profile/me
// @desc    Get current logged-in user's profile
// @access  Private
profileRouter.get("/me", authenticate, getMyProfile);

// @route   POST /api/profile
// @desc    Create or update user profile
// @access  Private
profileRouter.post("/", authenticate, createOrUpdateProfile);

// @route   GET /api/profile/user/:userId
// @desc    Get a user's public profile by userId
// @access  Public
profileRouter.get("/user/:userId", getProfileByUserId);

export default profileRouter;
