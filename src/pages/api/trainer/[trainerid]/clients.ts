// /pages/api/trainers/[trainerId]/clients.ts
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { usersTable } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { trainerId } = req.query;

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  if (!trainerId || typeof trainerId !== "string") {
    res.status(400).json({ error: "Invalid trainer ID" });
    return;
  }

  try {
    // Fetch clients assigned to a trainer
    const assignedClients = await db
      .select()
      .from(usersTable)
      .where(
        and(
          eq(usersTable.assignedTrainerId, parseInt(trainerId, 10)),
          eq(usersTable.role, "client")
        )
      );

    res.status(200).json(assignedClients);
  } catch (error) {
    console.error("Error fetching assigned clients:", error);
    res.status(500).json({ error: "Failed to fetch assigned clients" });
  }
}
