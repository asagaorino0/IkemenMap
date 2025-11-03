import { db } from "@/server/db";
import { stores } from "@/shared/schema";

async function seed() {
  console.log("データベースにシードデータを投入中...");

  const sampleStores = [
    {
      companyName: "イケメン株式会社",
      storeName: "渋谷センター店",
      address: "東京都渋谷区渋谷2-21-1",
      tel: "03-1234-5601",
      sns: "@yamada_shibuya",
      staffName: "山田太郎",
      latitude: "35.6595",
      longitude: "139.6982",
      postedAt: new Date("2025-10-12"),
    },
    {
      companyName: "メンズサロン株式会社",
      storeName: "新宿東口店",
      address: "東京都新宿区新宿3-38-1",
      tel: "03-1234-5602",
      sns: "@sato_shinjuku",
      staffName: "佐藤健",
      latitude: "35.6910",
      longitude: "139.7038",
      postedAt: new Date("2025-10-15"),
    },
    {
      companyName: "スタイリッシュ株式会社",
      storeName: "原宿本店",
      address: "東京都渋谷区神宮前1-19-11",
      tel: "03-1234-5603",
      sns: "@tanaka_harajuku",
      staffName: "田中翔",
      latitude: "35.6702",
      longitude: "139.7026",
      postedAt: new Date("2025-10-18"),
    },
    {
      companyName: "プレミアムサロン株式会社",
      storeName: "六本木ヒルズ店",
      address: "東京都港区六本木6-10-1",
      tel: "03-1234-5604",
      sns: "@suzuki_roppongi",
      staffName: "鈴木優",
      latitude: "35.6604",
      longitude: "139.7292",
      postedAt: new Date("2025-10-20"),
    },
    {
      companyName: "エリートサロン株式会社",
      storeName: "銀座中央店",
      address: "東京都中央区銀座4-6-16",
      tel: "03-1234-5605",
      sns: "@takahashi_ginza",
      staffName: "高橋蓮",
      latitude: "35.6719",
      longitude: "139.7648",
      postedAt: new Date("2025-10-22"),
    },
    {
      companyName: "モダンサロン株式会社",
      storeName: "表参道本店",
      address: "東京都渋谷区神宮前4-12-10",
      tel: "03-1234-5606",
      sns: "@ito_omotesando",
      staffName: "伊藤陽太",
      latitude: "35.6657",
      longitude: "139.7107",
      postedAt: new Date("2025-10-25"),
    },
    {
      companyName: "トレンドサロン株式会社",
      storeName: "池袋西口店",
      address: "東京都豊島区西池袋1-1-25",
      tel: "03-1234-5607",
      sns: "@watanabe_ikebukuro",
      staffName: "渡辺颯",
      latitude: "35.7295",
      longitude: "139.7010",
      postedAt: new Date("2025-10-27"),
    },
    {
      companyName: "ラグジュアリーサロン株式会社",
      storeName: "恵比寿ガーデンプレイス店",
      address: "東京都渋谷区恵比寿4-20-3",
      tel: "03-1234-5608",
      sns: "@nakamura_ebisu",
      staffName: "中村颯太",
      latitude: "35.6467",
      longitude: "139.7101",
      postedAt: new Date("2025-10-28"),
    },
  ];

  await db.insert(stores).values(sampleStores);
  console.log("シードデータの投入が完了しました！");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("シードデータ投入エラー:", error);
    process.exit(1);
  });
