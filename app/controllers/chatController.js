import { chatCore } from "../services/chatCore.js";

export async function chatHandler(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const reply = await chatCore(message);

    res.json({
      reply
    });

  } catch (error) {
    console.error("Chat error:", error);

    res.status(500).json({
      error: "Internal server error"
    });
  }
}