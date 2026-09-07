import express from "express";
import { createServer } from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import { authorizeAdmin } from "./middlewares/authorizeAdmin.js";
import authenticate from "./middlewares/authMiddleware.js";
import userRouter from "./routes/userRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import registerChatSocket from "./sockets/chatSocket.js";
import notificationRouter from "./routes/notificationRoutes.js";

const app = express();
const httpServer = createServer(app);
const port = Number(process.env.PORT || 3000);
const frontendOrigin = "https://dev-link-frontend-mu.vercel.app";
// process.env.FRONTEND_URL ||
const io = new Server(httpServer, {
  cors: { origin: frontendOrigin, credentials: true },
});

app.use(
  cors({
    origin: frontendOrigin,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/projects", projectRouter);
app.use("/api/chats", chatRouter);
app.use("/api/notifications", notificationRouter);

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
    registerChatSocket(io);
    httpServer.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

// DB_HOST=localhost
// DB_PORT=3306
// DB_USER=root
// DB_PASSWORD=1234
// DB_NAME=devlink
