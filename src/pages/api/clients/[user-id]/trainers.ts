import { NextApiRequest, NextApiResponse } from "next";
import { eq } from "drizzle-orm"; 
import { sessionsTable, trainersTable } from "@/lib/schema"; 
import { db } from "@/lib/db"; 


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
   
    const session = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.clientId, parseInt(userId, 10)))  
      .limit(1);

    if (!session || session.length === 0) {
      console.log(`No session found for client with ID: ${userId}`);
      res.status(404).json({ error: "No trainer assigned to this client." });
      return;
    }


    const trainerId = session[0].trainerId;
    console.log(`Trainer ID from session: ${trainerId}`);

    const trainer = await db
      .select()
      .from(trainersTable)
      .where(eq(trainersTable.id, trainerId))
      .limit(1);

    if (!trainer || trainer.length === 0) {
      console.log(`No trainer found with ID: ${trainerId}`);
      res.status(404).json({ error: "Trainer not found." });
      return;
    }

    res.status(200).json(trainer[0]);
  } catch (error) {
    console.error("Error fetching trainer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
