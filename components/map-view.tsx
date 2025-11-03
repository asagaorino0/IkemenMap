"use client";

import { useState, useEffect } from "react";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { Store } from "@/shared/schema";
import { StaffPanel } from "./staff-panel";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { searchStores } from "@/lib/actions";

interface MapViewProps {
  initialStores: Store[];
  initialSelectedId?: string | null;
}

export function MapView({ initialStores, initialSelectedId }: MapViewProps) {
  const [stores, setStores] = useState<Store[]>(initialStores);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  useEffect(() => {
    if (initialSelectedId) {
      const store = initialStores.find((s) => s.id === initialSelectedId);
      if (store) {
        setSelectedStore(store);
        setSelectedStoreId(initialSelectedId);
      }
    }
  }, [initialSelectedId, initialStores]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchStores(searchQuery);
        setStores(results || []);
      } catch (error) {
        console.error("検索エラー:", error);
        setStores([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleMarkerClick = (store: Store) => {
    setSelectedStore(store);
    setSelectedStoreId(store.id);
  };

  const handlePanelClose = () => {
    setSelectedStore(null);
    // selectedStoreIdは保持して、ピンの強調表示を維持
  };

  const center = stores && stores.length > 0
    ? { lat: parseFloat(stores[0].latitude), lng: parseFloat(stores[0].longitude) }
    : { lat: 35.6812, lng: 139.7671 };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-20 left-4 right-4 z-20 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="会社名、店舗名、住所、スタッフ名で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white shadow-lg"
            data-testid="search-input"
          />
        </div>
      </div>

      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={center}
          defaultZoom={12}
          mapId="staff-introduction-map"
          className="w-full h-full"
          data-testid="google-map"
        >
          {stores && stores.map((store) => {
            const isSelected = store.id === selectedStoreId;
            return (
              <AdvancedMarker
                key={store.id}
                position={{ lat: parseFloat(store.latitude), lng: parseFloat(store.longitude) }}
                onClick={() => handleMarkerClick(store)}
              >
                <Pin
                  background={isSelected ? "#ef4444" : "#1a73e8"}
                  borderColor={isSelected ? "#dc2626" : "#174ea6"}
                  glyphColor="#fff"
                  scale={isSelected ? 1.3 : 1.0}
                />
              </AdvancedMarker>
            );
          })}
        </Map>
      </APIProvider>

      <StaffPanel
        store={selectedStore}
        open={!!selectedStore}
        onClose={handlePanelClose}
      />
    </div>
  );
}
