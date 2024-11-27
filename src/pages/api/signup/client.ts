import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { clientsTable } from "@/lib/schema";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, email, password, age, weight, height, fitnessLevel, dietaryPreferences, trainingPreferences } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(clientsTable).values({
      name,
      email,
      password: hashedPassword,
      age,
      weight,
      height,
      fitnessLevel,
      dietaryPreferences,
      trainingPreferences,
    });

    res.status(201).json({ message: "Client registered successfully" });
  } catch (error) {
    console.error("Error registering client:", error);
    res.status(500).json({ error: "Failed to register client" });
  }
}
