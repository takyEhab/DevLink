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
const port = Number(process.env.PORT || 3000);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/projects", projectRouter);

app.use(errorMiddleware);

app.get("/", async (req, res) => {
  res.status(200).json({ message: "api root" });
});

app.get("/api/admin", authorizeAdmin, (req, res) => {
  res.send("Welcome, admin!");
});

app.get("/check-cookie", authenticate, (req, res) => {
  res.send({ cookie: req.cookies, me: req.user });
});

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
