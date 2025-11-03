import { z } from "zod";

// Store item type for Cosmos DB
export interface Store {
  id: string;
  companyName: string;
  storeName: string;
  address: string;
  tel: string;
  sns?: string;
  staffName: string;
  latitude: string;
  longitude: string;
  postedAt: Date;
}

// Zod schema for validation
export const insertStoreSchema = z.object({
  companyName: z.string().min(1),
  storeName: z.string().min(1),
  address: z.string().min(1),
  tel: z.string().min(1),
  sns: z.string().optional(),
  staffName: z.string().min(1),
  latitude: z.string().min(1),
  longitude: z.string().min(1),
  postedAt: z.date().optional(),
});

export type InsertStore = z.infer<typeof insertStoreSchema>;
