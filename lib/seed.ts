import { db } from "@/server/db";
import { stores } from "@/shared/schema";

async function seed() {
  console.log("Seeding database...");

  const sampleStores = [
    {
      companyName: "Coffee & Co.",
      storeName: "Downtown Cafe",
      address: "123 Main St, Tokyo, Japan",
      tel: "03-1234-5678",
      sns: "@downtown_cafe",
      staffName: "Yuki Tanaka",
      latitude: 35.6812,
      longitude: 139.7671,
    },
    {
      companyName: "Coffee & Co.",
      storeName: "Shibuya Branch",
      address: "456 Shibuya Crossing, Tokyo, Japan",
      tel: "03-2345-6789",
      sns: "@shibuya_cafe",
      staffName: "Kenji Sato",
      latitude: 35.6595,
      longitude: 139.7004,
    },
    {
      companyName: "Coffee & Co.",
      storeName: "Shinjuku Station",
      address: "789 Shinjuku St, Tokyo, Japan",
      tel: "03-3456-7890",
      sns: "@shinjuku_cafe",
      staffName: "Aiko Yamamoto",
      latitude: 35.6896,
      longitude: 139.7006,
    },
    {
      companyName: "Bakery Delights",
      storeName: "Roppongi Bakery",
      address: "321 Roppongi Hills, Tokyo, Japan",
      tel: "03-4567-8901",
      sns: "@roppongi_bakery",
      staffName: "Hiroshi Nakamura",
      latitude: 35.6606,
      longitude: 139.7298,
    },
    {
      companyName: "Tea House",
      storeName: "Ginza Tea Room",
      address: "654 Ginza Ave, Tokyo, Japan",
      tel: "03-5678-9012",
      sns: "@ginza_tea",
      staffName: "Sakura Suzuki",
      latitude: 35.6724,
      longitude: 139.7650,
    },
  ];

  await db.insert(stores).values(sampleStores);
  console.log("Seeding completed!");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  });
