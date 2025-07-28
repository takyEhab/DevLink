import express from "express";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use(errorMiddleware);
app.get("/", async (req, res) => {
  res.status(200).json({ message: "api root" });
});
app.listen(port, async () => {
  console.log(`Example app listening on port ${port}!`);
  await connectToDatabase();
});
