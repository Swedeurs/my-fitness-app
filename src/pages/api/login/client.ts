/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { clientsTable } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Find client by email
    const client = await db
      .select()
      .from(clientsTable)
      .where(eq(clientsTable.email, email))
      .limit(1);

    if (client.length === 0) {
      return res.status(404).json({ error: "Client not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, client[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const { password: _, ...clientData } = client[0];

    return res.status(200).json(clientData);
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
