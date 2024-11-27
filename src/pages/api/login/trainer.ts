import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { trainersTable } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Fetch trainer by email
    const trainer = await db
      .select()
      .from(trainersTable)
      .where(eq(trainersTable.email, email))
      .limit(1);

    if (trainer.length === 0) {
      return res.status(404).json({ error: "Trainer not found" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, trainer[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Respond with trainer data
    return res.status(200).json({
      id: trainer[0].id,
      name: trainer[0].name,
      email: trainer[0].email,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
