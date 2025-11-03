import { getAllStores } from "@/lib/actions";
import { MapView } from "@/components/map-view";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const stores = await getAllStores();

  return (
    <div className="relative">
      <div className="absolute top-4 left-4 z-30">
        <Link href="/listings">
          <Button variant="secondary" size="lg">
            View All Staff
          </Button>
        </Link>
      </div>
      <MapView stores={stores} />
    </div>
  );
}
