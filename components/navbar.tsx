"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Map, List } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-30" data-testid="navbar">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900" data-testid="app-title">
            うちらのイケメン
          </h1>
          <div className="flex gap-2">
            <Link href="/">
              <Button
                variant={pathname === "/" ? "default" : "outline"}
                size="sm"
                className="gap-2"
                data-testid="nav-map-button"
              >
                <Map className="h-4 w-4" />
                地図
              </Button>
            </Link>
            <Link href="/listings">
              <Button
                variant={pathname === "/listings" ? "default" : "outline"}
                size="sm"
                className="gap-2"
                data-testid="nav-listings-button"
              >
                <List className="h-4 w-4" />
                掲載一覧
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
