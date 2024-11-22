import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = req.query;

  if (req.method === "GET") {
    try {
      if (!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
      }

      const userIdNumber = parseInt(userId as string, 10);

      const user = await db
        .select()
        .from(users)
        .where(eq(users.userId, userIdNumber));

      if (user.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(200).json(user[0]);
    } catch (error) {
      console.error("Error retrieving user data:", error);
      res.status(500).json({ error: "Failed to retrieve user data" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
