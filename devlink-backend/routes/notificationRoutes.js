import { Router } from "express";
import authenticate from "../middlewares/authMiddleware.js";
import {
  getNotifications,
  markNotificationsRead,
} from "../controllers/notificationController.js";

const notificationRouter = Router();
notificationRouter.use(authenticate);
notificationRouter.get("/", getNotifications);
notificationRouter.patch("/read", markNotificationsRead);

export default notificationRouter;
