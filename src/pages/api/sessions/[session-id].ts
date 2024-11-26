import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { sessionsTable, notificationsTable } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function sessionHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { sessionId } = req.query;

  if (req.method === "DELETE") {
    // Cancel session
    try {
      // Fetch the session to get trainerId
      const session = await db
        .select()
        .from(sessionsTable)
        .where(eq(sessionsTable.id, parseInt(sessionId as string, 10)))
        .limit(1);

      if (!session[0]) {
        return res.status(404).json({ error: "Session not found" });
      }

      const trainerId = session[0].trainerId;

      await db
        .update(sessionsTable)
        .set({ status: "available", clientId: null })
        .where(eq(sessionsTable.id, parseInt(sessionId as string, 10)));

      const notificationMessage = `Session at ${session[0].sessionTime} has been cancelled by the client.`;
      await db.insert(notificationsTable).values({
        userId: trainerId,
        message: notificationMessage,
      });

      res.status(200).json({ message: "Session cancelled successfully" });
    } catch (error) {
      console.error("Failed to cancel the session:", error);
      res.status(500).json({ error: "Failed to cancel the session" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
