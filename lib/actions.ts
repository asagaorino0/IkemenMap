"use server";

import { container } from "@/server/db";
import { Store } from "@/shared/schema";
import { v4 as uuidv4 } from "uuid";

export async function getAllStores(): Promise<Store[]> {
  const { resources: items } = await container.items
    .query<Store>({
      query: "SELECT * FROM c ORDER BY c.postedAt DESC"
    })
    .fetchAll();
  
  return items.map(item => ({
    ...item,
    postedAt: new Date(item.postedAt)
  }));
}

export async function getStoreById(id: string): Promise<Store | null> {
  try {
    const { resource: item } = await container.item(id, id).read<Store>();
    if (!item) return null;
    
    return {
      ...item,
      postedAt: new Date(item.postedAt)
    };
  } catch (error: any) {
    if (error.code === 404) {
      return null;
    }
    throw error;
  }
}

export async function searchStores(query: string): Promise<Store[]> {
  if (!query) {
    return await getAllStores();
  }

  const { resources: items } = await container.items
    .query<Store>({
      query: `
        SELECT * FROM c 
        WHERE CONTAINS(LOWER(c.companyName), LOWER(@query))
           OR CONTAINS(LOWER(c.storeName), LOWER(@query))
           OR CONTAINS(LOWER(c.address), LOWER(@query))
           OR CONTAINS(LOWER(c.staffName), LOWER(@query))
        ORDER BY c.postedAt DESC
      `,
      parameters: [{ name: "@query", value: query }]
    })
    .fetchAll();
  
  return items.map(item => ({
    ...item,
    postedAt: new Date(item.postedAt)
  }));
}

export async function addStore(data: {
  companyName: string;
  storeName: string;
  address: string;
  tel: string;
  sns?: string;
  staffName: string;
  latitude: string;
  longitude: string;
}): Promise<Store> {
  const newStore: Store = {
    id: uuidv4(),
    companyName: data.companyName,
    storeName: data.storeName,
    address: data.address,
    tel: data.tel,
    sns: data.sns || "",
    staffName: data.staffName,
    latitude: data.latitude,
    longitude: data.longitude,
    postedAt: new Date(),
  };

  await container.items.create(newStore);
  
  return newStore;
}
