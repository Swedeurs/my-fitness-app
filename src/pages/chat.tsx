import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { chatMessagesTable } from "@/lib/schema";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { senderId, receiverId, message } = req.body;
    try {
      await db.insert(chatMessagesTable).values({ senderId, receiverId, message });
      res.status(201).json({ message: "Message sent" });
    } catch (error) {
      console.error("Failed to send message:", error); // Log the error
      res.status(500).json({ error: "Failed to send message" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
