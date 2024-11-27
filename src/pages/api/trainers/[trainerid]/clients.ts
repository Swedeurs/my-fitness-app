import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db"; 
import { clientsTable } from "@/lib/schema"; 
import { eq } from "drizzle-orm"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { trainerId } = req.query;

  if (req.method !== "GET") {
    return res.status(405).setHeader("Allow", ["GET"]).end(`Method ${req.method} Not Allowed`);
  }

  if (!trainerId || typeof trainerId !== "string") {
    return res.status(400).json({ error: "Invalid trainer ID" });
  }

  try {
    
    const clients = await db
      .select()
      .from(clientsTable)
      .where(eq(clientsTable.assignedTrainerId, parseInt(trainerId, 10)));

    if (clients.length === 0) {
      return res.status(404).json({ error: "No clients found for this trainer." });
    }

    return res.status(200).json(clients); 
  } catch (error) {
    console.error("Error fetching clients:", error);
    return res.status(500).json({ error: "Failed to fetch clients." });
  }
}
