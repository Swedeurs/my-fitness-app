import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { clientsTable } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { trainerId, clientId } = req.body;

    if (!trainerId || !clientId) {
      return res.status(400).json({ error: "Missing trainerId or clientId" });
    }

    try {
      const updatedClient = await db
        .update(clientsTable)
        .set({ assignedTrainerId: trainerId })
        .where(eq(clientsTable.id, clientId));

      if (updatedClient.rowCount === 0) {
        return res.status(404).json({ error: "Client not found" });
      }

      res.status(200).json({ message: "Client assigned successfully" });
    } catch (error) {
      console.error("Error assigning client:", error);
      res.status(500).json({ error: "Failed to assign client" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
