"use server";

import { sql, Comment } from "@/app/lib/db";
import { revalidatePath } from "next/cache";

// Add a new comment to the database
export async function addComment(formData: FormData) {
  // Check if database is configured
  if (!sql) {
    return { success: false, error: "Database belum dikonfigurasi" };
  }

  const name = formData.get("name") as string;
  const rating = parseInt(formData.get("rating") as string, 10);
  const content = formData.get("content") as string;

  // Validate inputs
  if (!name || !content || !rating) {
    return { success: false, error: "Semua field wajib diisi" };
  }

  if (rating < 1 || rating > 5) {
    return { success: false, error: "Rating harus antara 1-5" };
  }

  try {
    await sql`
      INSERT INTO comments (name, rating, content, created_at)
      VALUES (${name}, ${rating}, ${content}, NOW())
    `;

    // Revalidate the home page to show the new comment
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Error adding comment:", error);
    return { success: false, error: "Gagal menyimpan komentar" };
  }
}

// Get all comments from the database, ordered by newest first
export async function getComments(): Promise<Comment[]> {
  // Return empty array if database not configured
  if (!sql) {
    return [];
  }

  try {
    const comments = await sql`
      SELECT id, name, rating, content, created_at
      FROM comments
      ORDER BY created_at DESC
      LIMIT 50
    `;
    return comments as Comment[];
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}
