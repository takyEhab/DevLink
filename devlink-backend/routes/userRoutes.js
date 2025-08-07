import { Router } from "express";
import {
  getCurrentUser,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import authenticate from "../middlewares/authMiddleware.js";

const userRouter = Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
userRouter.post("/register", register);

// @route   POST /api/users/login
// @desc    Login user and return token (or set cookie)
// @access  Public
userRouter.post("/login", login);

// @route   GET /api/users/is-authenticated
// @desc    Check if user is logged in, return user info
// @access  Private
userRouter.get("/is-authenticated", authenticate, getCurrentUser);

// @route   POST /api/users/logout
// @desc    Logout user (clear token/cookie)
// @access  Public or Private (your choice)
userRouter.post("/logout", logout);

export default userRouter;
