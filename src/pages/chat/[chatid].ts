import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { chatMessagesTable } from "@/lib/schema";
import { eq, or } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { chatId } = req.query;

  // Validate chatId
  if (!chatId || typeof chatId !== "string") {
    return res.status(400).json({ error: "Invalid chatId" });
  }

  if (req.method === "GET") {
    const [userId1, userId2] = chatId.split("-").map(Number);

    try {
      const messages = await db
        .select()
        .from(chatMessagesTable)
        .where(
          or(
            eq(chatMessagesTable.senderId, userId1),
            eq(chatMessagesTable.receiverId, userId2),
          ),
        );

      return res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      return res.status(500).json({ error: "Failed to fetch messages." });
    }
  } else if (req.method === "POST") {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      await db.insert(chatMessagesTable).values({
        senderId,
        receiverId,
        message,
        timestamp: new Date(), // Use a Date object instead of a string
      });
      return res.status(201).json({ message: "Message sent successfully." });
    } catch (error) {
      console.error("Error sending message:", error);
      return res.status(500).json({ error: "Failed to send message." });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
