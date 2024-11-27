import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";  // Make sure the database is correctly initialized
import {  clientsTable } from "@/lib/schema";  // Adjust based on your schema
import { eq } from "drizzle-orm"; // Make sure you're importing the ORM correctly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    if (!id) {
      return res.status(400).json({ error: "Trainer ID is required." });
    }

    try {
      // Fetch all clients assigned to this trainer
      const clients = await db
        .select()
        .from(clientsTable)
        .where(eq(clientsTable.assignedTrainerId, parseInt(id as string, 10))); // Assuming assignedTrainerId exists in the schema

      if (clients.length === 0) {
        return res.status(404).json({ error: "No clients found for this trainer." });
      }

      return res.status(200).json(clients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
