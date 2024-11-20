import { Pool } from "pg";
import { drizzle } from "drizzle-orm/d1";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);
