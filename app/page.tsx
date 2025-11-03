import { getAllStores, getStoreById } from "@/lib/actions";
import { MapView } from "@/components/map-view";
import { Navbar } from "@/components/navbar";

interface HomePageProps {
  searchParams: Promise<{ storeId?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const stores = await getAllStores();
  const selectedStoreId = params.storeId || null;

  return (
    <div className="relative">
      <Navbar />
      <div className="pt-16">
        <MapView 
          initialStores={stores} 
          initialSelectedId={selectedStoreId}
        />
      </div>
    </div>
  );
}
