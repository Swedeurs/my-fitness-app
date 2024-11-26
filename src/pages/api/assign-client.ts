import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { usersTable } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { clientId, trainerId } = req.body;

  if (!clientId || !trainerId) {
    res.status(400).json({ error: "Invalid client or trainer ID" });
    return;
  }

  try {
    // Update client to assign them to the given trainer
    await db
      .update(usersTable)
      .set({ assignedTrainerId: trainerId })
      .where(eq(usersTable.id, clientId));

    res.status(200).json({ message: "Client assigned successfully" });
  } catch (error) {
    console.error("Error assigning client:", error);
    res.status(500).json({ error: "Failed to assign client" });
  }
}
