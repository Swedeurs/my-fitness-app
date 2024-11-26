import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { sessionsTable, usersTable } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  if (!userId || typeof userId !== "string") {
    res.status(400).json({ error: "Invalid user ID" });
    return;
  }

  try {
    // Get the session where this client is assigned a trainer
    const session = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.clientId, parseInt(userId, 10)))
      .limit(1);

    if (!session.length) {
      res.status(404).json({ error: "No trainer assigned to this client." });
      return;
    }

    // Get the trainer's information
    const trainerId = session[0].trainerId;
    const trainer = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, trainerId))
      .limit(1);

    if (!trainer.length) {
      res.status(404).json({ error: "Trainer not found." });
      return;
    }

    res.status(200).json(trainer[0]);
  } catch (error) {
    console.error("Error fetching trainer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
