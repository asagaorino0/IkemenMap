"use server";

import { db } from "@/server/db";
import { stores } from "@/shared/schema";
import { desc, eq, or, ilike } from "drizzle-orm";

export async function getAllStores() {
  return await db.select().from(stores).orderBy(desc(stores.postedAt));
}

export async function getStoreById(id: string) {
  const result = await db.select().from(stores).where(eq(stores.id, id));
  return result[0] || null;
}

export async function searchStores(query: string) {
  if (!query) {
    return await getAllStores();
  }

  const searchPattern = `%${query}%`;
  return await db
    .select()
    .from(stores)
    .where(
      or(
        ilike(stores.companyName, searchPattern),
        ilike(stores.storeName, searchPattern),
        ilike(stores.address, searchPattern),
        ilike(stores.staffName, searchPattern)
      )
    )
    .orderBy(desc(stores.postedAt));
}
