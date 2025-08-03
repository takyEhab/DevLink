import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import authenticate from "../middlewares/authenticate.js";
import User from "../models/user.models.js";

const authRouter = Router();

// register with controller
authRouter.post("/register", register);

// login with controller
authRouter.post("/login", login);

// check logged in and only get all user info here
authRouter.get("/is-authenticated", authenticate, async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({ isAuthenticated: true, user });
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export default authRouter;
