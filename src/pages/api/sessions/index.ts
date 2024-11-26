import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { sessionsTable } from "@/lib/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    // Handle GET request: Get all sessions
    try {
      const allSessions = await db.select().from(sessionsTable);
      res.status(200).json(allSessions);
    } catch (error) {
      console.error("Failed to retrieve sessions:", error); // Log the error
      res.status(500).json({ error: "Failed to retrieve sessions" });
    }
  } else if (req.method === "POST") {
    // Handle POST request: Create a new session
    const { trainerId, sessionTime } = req.body;
    if (!trainerId || !sessionTime) {
      res.status(400).json({ error: "Missing required fields: trainerId or sessionTime" });
      return;
    }
    try {
      const newSession = await db.insert(sessionsTable).values({
        trainerId,
        sessionTime,
        status: "available",
      });
      res.status(201).json(newSession);
    } catch (error) {
      console.error("Failed to create a session:", error); // Log the error
      res.status(500).json({ error: "Failed to create a session" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
