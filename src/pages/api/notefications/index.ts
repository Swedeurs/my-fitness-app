import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { notificationsTable } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";

export default async function notificationHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const { userId } = req.query;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    try {
      const notifications = await db
        .select()
        .from(notificationsTable)
        .where(eq(notificationsTable.userId, parseInt(userId as string, 10)))
        .orderBy(sql`${notificationsTable.timestamp} DESC`);

      res.status(200).json(notifications);
    } catch {
      res.status(500).json({ error: "Failed to retrieve notifications" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
