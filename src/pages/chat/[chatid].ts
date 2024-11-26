import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { chatMessagesTable } from "@/lib/schema";
import { eq, or } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { chatId } = req.query;

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  if (!chatId || typeof chatId !== "string") {
    res.status(400).json({ error: "Invalid chat ID" });
    return;
  }

  try {
    const [userId1, userId2] = chatId.split("-").map(Number);
    if (!userId1 || !userId2) {
      res.status(400).json({ error: "Invalid chat ID format" });
      return;
    }

    const messages = await db
      .select()
      .from(chatMessagesTable)
      .where(
        or(
          eq(chatMessagesTable.senderId, userId1),
          eq(chatMessagesTable.receiverId, userId2),
        ),
      );

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    res.status(500).json({ error: "Failed to fetch chat messages" });
  }
}
