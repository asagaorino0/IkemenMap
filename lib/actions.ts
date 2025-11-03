"use server";

import { db } from "@/server/db";
import { stores } from "@/shared/schema";
import { desc, eq } from "drizzle-orm";

export async function getAllStores() {
  return await db.select().from(stores).orderBy(desc(stores.postedAt));
}

export async function getStoreById(id: number) {
  const result = await db.select().from(stores).where(eq(stores.id, id));
  return result[0] || null;
}
