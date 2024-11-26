import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { usersTable } from "@/lib/schema";
import { eq, isNull, and } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    const unassignedClients = await db
      .select()
      .from(usersTable)
      .where(
        and(
          isNull(usersTable.assignedTrainerId), // Fetch clients with no assigned trainer
          eq(usersTable.role, "client")
        )
      );

    res.status(200).json(unassignedClients);
  } catch (error) {
    console.error("Error fetching unassigned clients:", error);
    res.status(500).json({ error: "Failed to fetch unassigned clients" });
  }
}
