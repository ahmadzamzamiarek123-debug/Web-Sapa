import { neon, NeonQueryFunction } from "@neondatabase/serverless";

// Type definitions for our comments table
export interface Comment {
  id: number;
  name: string;
  rating: number;
  content: string;
  created_at: string;
}

// Create a SQL query function using the Neon serverless driver
// Returns null if DATABASE_URL is not configured (allows build without DB)
function createSqlClient(): NeonQueryFunction<false, false> | null {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.warn("⚠️ DATABASE_URL not configured. Database features disabled.");
    return null;
  }

  return neon(databaseUrl);
}

export const sql = createSqlClient();
