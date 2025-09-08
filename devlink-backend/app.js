import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import { authorizeAdmin } from "./middlewares/authorizeAdmin.js";
import authenticate from "./middlewares/authMiddleware.js";
import userRouter from "./routes/userRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import projectRouter from "./routes/projectRoutes.js";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // allow frontend URL
    credentials: true, // allow cookies
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/projects", projectRouter);

// error handler
app.use(errorMiddleware);

// root testing
app.get("/", async (req, res) => {
  res.status(200).json({ message: "api root" });
});

// testing only
app.get("/api/admin", authorizeAdmin, (req, res) => {
  res.send("Welcome, admin!");
});
// testing cookie with user
app.get("/check-cookie", authenticate, (req, res) => {
  console.log(req.cookies);
  console.log(req.user);
  res.send({ cookie: req.cookies, me: req.user });
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}!`);
  await connectToDatabase();
});
