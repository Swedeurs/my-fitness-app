import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { clientsTable } from "@/lib/schema";
import { isNull } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const clients = await db
      .select()
      .from(clientsTable)
      .where(isNull(clientsTable.assignedTrainerId));

    if (clients.length === 0) {
      return res.status(404).json({ error: "No unassigned clients." });
    }

    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching unassigned clients:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
