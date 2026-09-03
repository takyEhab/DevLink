import { Router } from "express";
import authenticate from "../middlewares/authMiddleware.js";
import {
  createConversation,
  getConversations,
  getMessages,
  markConversationRead,
  sendMessage,
} from "../controllers/chatController.js";

const chatRouter = Router();

chatRouter.use(authenticate);
chatRouter.get("/", getConversations);
chatRouter.post("/", createConversation);
chatRouter.get("/:conversationId/messages", getMessages);
chatRouter.post("/:conversationId/messages", sendMessage);
chatRouter.patch("/:conversationId/read", markConversationRead);

export default chatRouter;
