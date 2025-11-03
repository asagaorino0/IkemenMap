import { pgTable, serial, text, timestamp, doublePrecision } from "drizzle-orm/pg-core";

export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  storeName: text("store_name").notNull(),
  address: text("address").notNull(),
  tel: text("tel").notNull(),
  sns: text("sns"),
  staffName: text("staff_name").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  postedAt: timestamp("posted_at").notNull().defaultNow(),
});

export type Store = typeof stores.$inferSelect;
export type InsertStore = typeof stores.$inferInsert;
