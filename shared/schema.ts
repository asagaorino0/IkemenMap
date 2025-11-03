import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const stores = pgTable("stores", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull(),
  storeName: text("store_name").notNull(),
  address: text("address").notNull(),
  tel: text("tel").notNull(),
  sns: text("sns"),
  staffName: text("staff_name").notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  postedAt: timestamp("posted_at").notNull().defaultNow(),
});

export const insertStoreSchema = createInsertSchema(stores).omit({ id: true });
export type InsertStore = z.infer<typeof insertStoreSchema>;
export type Store = typeof stores.$inferSelect;
