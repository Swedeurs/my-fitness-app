import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { text, serial, pgTable, timestamp } from "drizzle-orm/pg-core";

export const chatMessages = pgTable("chat_messages", {
  messageId: serial("message_id").primaryKey(),
  senderId: text("sender_id"),
  receiverId: text("receiver_id"),
  message: text("message"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { senderId, receiverId, message } = req.body;
    try {
      await db.insert(chatMessages).values({ senderId, receiverId, message });
      res.status(201).json({ message: "Message sent" });
    } catch (error) {
      res.status(500).json({ error: "Failed to send message" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
