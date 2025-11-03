import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "推しまてる | スタッフ紹介アプリ",
  description: "店舗とスタッフの位置情報を地図で確認できます",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
