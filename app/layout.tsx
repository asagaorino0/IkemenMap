import type { Metadata } from "next";
import { Shippori_Mincho, Yuji_Boku, Yuji_Syuku } from "next/font/google";
import "./globals.css";

const shipporiMincho = Shippori_Mincho({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-shippori-mincho",
});

const yujiSyuku = Yuji_Syuku({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yuji-syuku",
});
const yujiBoku = Yuji_Boku({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yuji-boku",
});

export const metadata: Metadata = {
  title: "推しまてる | イケメンマップ",
  description: "店舗とスタッフの位置情報を地図で確認できます",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`antialiased ${yujiBoku.variable}`}>{children}</body>
    </html>
  );
}
