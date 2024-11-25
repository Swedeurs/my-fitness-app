import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { sessions } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    // Get all sessions
    try {
      const allSessions = await db.select().from(sessions);
      res.status(200).json(allSessions);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve sessions" });
    }
  } else if (req.method === "POST") {
    // Create a new session
    const { trainerId, sessionTime } = req.body;
    try {
      const newSession = await db.insert(sessions).values({
        trainerId,
        sessionTime,
        status: "available",
      });
      res.status(201).json(newSession);
    } catch (error) {
      res.status(500).json({ error: "Failed to create a session" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
