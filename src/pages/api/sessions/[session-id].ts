import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { sessions } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { sessionId } = req.query;

  if (req.method === "PATCH") {
    // Book or update session
    const { clientId, status, newTime } = req.body;

    try {
      const session = await db
        .update(sessions)
        .set({
          clientId,
          status,
          sessionTime: newTime ? new Date(newTime) : undefined,
        })
        .where(eq(sessions.sessionId, parseInt(sessionId as string, 10)));

      res.status(200).json({ message: "Session updated successfully", session });
    } catch (error) {
      res.status(500).json({ error: "Failed to update the session" });
    }
  } else if (req.method === "DELETE") {
    // Cancel session
    try {
      await db
        .update(sessions)
        .set({ status: "available", clientId: null })
        .where(eq(sessions.sessionId, parseInt(sessionId as string, 10)));

      res.status(200).json({ message: "Session cancelled successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to cancel the session" });
    }
  } else {
    res.setHeader("Allow", ["PATCH", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
