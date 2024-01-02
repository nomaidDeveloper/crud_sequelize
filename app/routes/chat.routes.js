import express from "express";
import { tokenValidation } from "../config/auth.js";
const router = express.Router();
import { createChatMessage, getChatMessages } from "../controllers/chat.controller.js";

// Send a chat message (requires token validation)
router.post("/send-message", tokenValidation, createChatMessage);

// Get chat messages (requires token validation)
router.get("/get-messages", tokenValidation, getChatMessages);

export default router;
