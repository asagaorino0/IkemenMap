import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Staff Introduction | Store Locations",
  description: "Find our stores and meet our staff members",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
