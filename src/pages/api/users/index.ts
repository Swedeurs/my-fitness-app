import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { clientsTable, trainersTable } from "@/lib/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const {
      name,
      email,
      age,
      role,
      password,
      fitnessLevel,
      dietaryPreferences,
      specialization,
      experienceYears,
    } = req.body;

    if (!name || !email || !age || !role || !password) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Determine the table based on the role
      if (role === "client") {
        // Check if email already exists
        const existingClient = await db
          .select()
          .from(clientsTable)
          .where(eq(clientsTable.email, email))
          .limit(1);

        if (existingClient.length > 0) {
          return res.status(400).json({ error: "Email is already registered" });
        }

        // Insert into the clients table
        await db.insert(clientsTable).values({
          name,
          email,
          password: hashedPassword, // Include hashed password
          age,
          fitnessLevel,
          dietaryPreferences,
        });

        res.status(201).json({ message: "Client created successfully" });
      } else if (role === "trainer") {
        // Check if email already exists
        const existingTrainer = await db
          .select()
          .from(trainersTable)
          .where(eq(trainersTable.email, email))
          .limit(1);

        if (existingTrainer.length > 0) {
          return res.status(400).json({ error: "Email is already registered" });
        }

        // Insert into the trainers table
        await db.insert(trainersTable).values({
          name,
          email,
          password: hashedPassword, // Include hashed password
          specialization,
          experienceYears,
        });

        res.status(201).json({ message: "Trainer created successfully" });
      } else {
        res.status(400).json({ error: "Invalid role specified" });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
