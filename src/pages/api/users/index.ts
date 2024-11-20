/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/db";
import { users } from "../../../lib/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "POST") {
      const { age, weight, height, fitnessLevel, dietaryPreferences } =
        req.body;

      await db
        .insert(users)
        .values({
          age,
          weight,
          height,
          fitnessLevel,
          dietaryPreferences,
        })
        .execute();

      res.status(201).json({ message: "User created successfully" });
    } else if (req.method === "GET") {
      const allUsers = await db.select().from(users).execute();
      res.status(200).json(allUsers);
    } else {
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}
