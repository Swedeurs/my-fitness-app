import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { trainersTable } from "@/lib/schema";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, email, password, specialization, experienceYears } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(trainersTable).values({
      name,
      email,
      password: hashedPassword,
      specialization,
      experienceYears,
    });

    res.status(201).json({ message: "Trainer registered successfully" });
  } catch (error) {
    console.error("Error registering trainer:", error);
    res.status(500).json({ error: "Failed to register trainer" });
  }
}
