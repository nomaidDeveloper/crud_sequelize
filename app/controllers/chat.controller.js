import { Sequelize } from "sequelize";
const db = require("../models");
const ChatMessage = db.ChatMessage;

export const createChatMessage = async (req, res) => {
  try {
    const { content } = req.body;

    // Save the chat message to the database
    const newMessage = await ChatMessage.create({ content });

    // Emit the chat message to all connected clients
    io.emit("chat message", newMessage);

    res.status(201).json({
      message: "Chat message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send chat message" });
  }
};

export const getChatMessages = async (req, res) => {
  try {
    // Get all chat messages from the database
    const messages = await ChatMessage.findAll();

    res.status(200).json({
      message: "Chat messages retrieved successfully",
      data: messages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve chat messages" });
  }
};
