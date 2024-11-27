// /pages/api/trainers/[trainerId]/clients.ts

import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { sessionsTable, clientsTable } from "@/lib/schema";
import { eq, inArray } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { trainerId } = req.query;

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  // Validate trainerId
  if (!trainerId || typeof trainerId !== "string") {
    res.status(400).json({ error: "Invalid or missing trainer ID." });
    return;
  }

  try {
    // Fetch all sessions where the trainerId matches
    const sessions = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.trainerId, parseInt(trainerId, 10)));

    if (!sessions || sessions.length === 0) {
      res.status(404).json({ error: "No clients found for this trainer." });
      return;
    }

    // Extract client IDs from sessions
    const clientIds = sessions
      .map((session) => session.clientId)
      .filter((id) => id !== null); // Filter out null client IDs

    if (clientIds.length === 0) {
      res.status(404).json({ error: "No clients found for this trainer." });
      return;
    }

    // Fetch client details from the clientsTable
    const clients = await db
      .select()
      .from(clientsTable)
      .where(inArray(clientsTable.id, clientIds));

    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients for trainer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
