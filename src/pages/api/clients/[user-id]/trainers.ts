import { NextApiRequest, NextApiResponse } from "next";
import { eq } from "drizzle-orm";
import { sessionsTable, trainersTable } from "@/lib/schema";
import { db } from "@/lib/db";



// API handler for getting trainer info for a given userId
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = req.query;

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  // Check if userId is provided
  if (!userId || typeof userId !== "string") {
    res.status(400).json({ error: "Invalid user ID" });
    return;
  }

  try {
    // Fetch a session involving this client to see if there's a trainer assigned
    const session = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.clientId, parseInt(userId, 10)))
      .limit(1);

    if (!session || session.length === 0) {
      res.status(404).json({ error: "No trainer assigned to this client." });
      return;
    }

    // Fetch the trainer information using trainerId from the session
    const trainerId = session[0].trainerId;
    const trainer = await db
      .select()
      .from(trainersTable) // Correct table for trainer information
      .where(eq(trainersTable.id, trainerId))
      .limit(1);

    if (!trainer || trainer.length === 0) {
      res.status(404).json({ error: "Trainer not found." });
      return;
    }

    res.status(200).json(trainer[0]);
  } catch (error) {
    console.error("Error fetching trainer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
