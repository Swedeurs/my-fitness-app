import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { usersTable } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, age, role, fitnessLevel, dietaryPreferences } = req.body;

    if (!name || !email || !age || !role) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    try {
      // Check if the user already exists
      const existingUsers = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1);

      if (existingUsers.length > 0) {
        res.status(400).json({ error: "Email is already registered" });
        return;
      }

      // Insert the new user
      await db.insert(usersTable).values({
        name,
        email,
        age,
        role,
        fitnessLevel,
        dietaryPreferences,
      });

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
