import express from "express";
import { fullResponseChatHandler, streamResponseChathandler } from "../controllers/chatController.js";

const router = express.Router();

router.post("/chat", fullResponseChatHandler);
router.post("/chat/stream",streamResponseChathandler);

export default router;