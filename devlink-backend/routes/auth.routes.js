import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

const authRouter = Router();

// register with controller
authRouter.post("/register", register);

// login with controller
authRouter.post("/login", login);


authRouter.post("/logout", (req, res) => {
  res.send("logout...");
});

// username: taky
// password: taky1234
//mongodb+srv://taky:taky1234@cluster0.kghrkf7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

export default authRouter;
