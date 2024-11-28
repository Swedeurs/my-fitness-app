import { NextApiRequest, NextApiResponse } from "next";
import { eq } from "drizzle-orm";
import { sessionsTable, trainersTable } from "@/lib/schema";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = req.query;

  // Ensure the method is GET
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Validate the userId parameter
  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    // Query for the session associated with the client
    const session = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.clientId, parseInt(userId, 10)));

    // Check if no session is found
    if (!session || session.length === 0) {
      console.log(`No session found for client with ID: ${userId}`);
      return res
        .status(404)
        .json({ error: "No trainer assigned to this client." });
    }

    // Get the trainer ID from the first session (assuming only one session per client)
    const trainerId = session[0].trainerId;
    console.log(`Trainer ID from session: ${trainerId}`);

    // Query for the trainer associated with the session
    const trainer = await db
      .select()
      .from(trainersTable)
      .where(eq(trainersTable.id, trainerId));

    // Check if no trainer is found
    if (!trainer || trainer.length === 0) {
      console.log(`No trainer found with ID: ${trainerId}`);
      return res.status(404).json({ error: "Trainer not found." });
    }

    // Return trainer details
    return res.status(200).json(trainer[0]); // Send the first trainer object
  } catch (error) {
    console.error("Error fetching trainer:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
