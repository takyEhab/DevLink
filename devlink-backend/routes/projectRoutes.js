import express from "express";
import { createProject, getProjectsByUser } from "../controllers/projectController.js";
import { upload } from "../config/config.js";
import authenticate  from "../middlewares/authMiddleware.js"; // assuming you have auth

const router = express.Router();

router.post("/", authenticate, upload.single("image"), createProject);
router.get("/:userId", getProjectsByUser);

export default router;
