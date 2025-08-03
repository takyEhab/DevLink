import express from "express";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import { authorizeAdmin } from "./middlewares/authorizeAdmin.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authenticate from "./middlewares/authenticate.js";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // allow your frontend URL
    credentials: true, // allow cookies (important for auth)
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRouter);

// testing
app.get("/api/admin", authorizeAdmin, (req, res) => {
  res.send("Welcome, admin!");
});

app.get("/check-cookie", authenticate, (req, res) => {
  console.log(req.cookies);
  console.log(req.user);
  res.send({ cookie: req.cookies, me: req.user });

  // Check if a specific cookie exists
  // if (req.cookies.token) {
  //   console.log("myCookieName exists:", req.cookies.myCookieName);
  //   res.send('Cookie "myCookieName" found!');
  // } else {
  //   console.log("myCookieName does not exist.");
  //   res.send('Cookie "myCookieName" not found.');
  // }

  // // Log all cookies
  // console.log("All cookies:", req.cookies);
});

// error handler
app.use(errorMiddleware);

// root testing
app.get("/", async (req, res) => {
  res.status(200).json({ message: "api root" });
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}!`);
  await connectToDatabase();
});
