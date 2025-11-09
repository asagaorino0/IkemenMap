"use client";

import { useState, useEffect, useCallback } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { Store } from "@/shared/schema";
import { StaffPanel } from "./staff-panel";
import { AddStoreForm } from "./add-store-form";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { searchStores } from "@/lib/actions";

interface MapViewProps {
  initialStores: Store[];
  initialSelectedId?: string | null;
}

interface ContextMenuState {
  show: boolean;
  x: number;
  y: number;
  lat: number;
  lng: number;
}

function MapEventHandler({
  onRightClick,
}: {
  onRightClick: (e: google.maps.MapMouseEvent) => void;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) {
      console.log("MapEventHandler: mapがまだ初期化されていません");
      return;
    }

    console.log("MapEventHandler: rightclickリスナーを登録");
    const listener = map.addListener("rightclick", onRightClick);

    return () => {
      console.log("MapEventHandler: rightclickリスナーを削除");
      google.maps.event.removeListener(listener);
    };
  }, [map, onRightClick]);

  return null;
}

function MapCenterController({
  stores,
  searchQuery,
}: {
  stores: Store[];
  searchQuery: string;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map || !searchQuery) return;

    // 検索クエリをジオコーディングして地図を移動
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery, region: 'jp' }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location;
        map.panTo(location);
        map.setZoom(14);
      } else if (stores.length > 0) {
        // ジオコーディングに失敗した場合、最初の店舗位置に移動
        const firstStore = stores[0];
        const center = {
          lat: parseFloat(firstStore.latitude),
          lng: parseFloat(firstStore.longitude),
        };
        map.panTo(center);
        map.setZoom(14);
      }
    });
  }, [map, stores, searchQuery]);

  return null;
}

export function MapView({ initialStores, initialSelectedId }: MapViewProps) {
  const [stores, setStores] = useState<Store[]>(initialStores);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    show: false,
    x: 0,
    y: 0,
    lat: 0,
    lng: 0,
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
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

  const handleMapRightClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng && e.domEvent) {
      e.domEvent.preventDefault();
      e.domEvent.stopPropagation();

      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const domEvent = e.domEvent;

      let clientX = 0;
      let clientY = 0;

      if ("clientX" in domEvent && "clientY" in domEvent) {
        clientX = domEvent.clientX;
        clientY = domEvent.clientY;
      } else if ("touches" in domEvent && domEvent.touches.length > 0) {
        clientX = domEvent.touches[0].clientX;
        clientY = domEvent.touches[0].clientY;
      }

      setContextMenu({
        show: true,
        x: clientX,
        y: clientY,
        lat,
        lng,
      });
    }
  }, []);

  const handleAddStoreClick = () => {
    if (contextMenu.lat && contextMenu.lng) {
      setSelectedLocation({ lat: contextMenu.lat, lng: contextMenu.lng });
      setShowAddForm(true);
      setSelectedStore(null);
    }
    setContextMenu({ ...contextMenu, show: false });
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
    setSelectedLocation(null);
  };

  const handleStoreAdded = (newStore: Store) => {
    setStores([...stores, newStore]);
    setShowAddForm(false);
    setSelectedLocation(null);
  };

  useEffect(() => {
    const handleClick = () => {
      if (contextMenu.show) {
        setContextMenu({ ...contextMenu, show: false });
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [contextMenu.show]);

  const center =
    stores && stores.length > 0
      ? {
        lat: parseFloat(stores[0].latitude),
        lng: parseFloat(stores[0].longitude),
      }
      : { lat: 35.6812, lng: 139.7671 };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-5 left-4 z-20 max-w-md w-full md:w-96">
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

      {/* 地図の中心を示す十字マーク */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <div className="relative w-8 h-8">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 transform -translate-y-1/2"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-500 transform -translate-x-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      {contextMenu.show && (
        <div
          className="fixed bg-white shadow-lg rounded-md py-1 z-50 border border-gray-200"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleAddStoreClick}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
            data-testid="context-menu-add"
          >
            <Plus className="h-4 w-4" />
            情報を掲載
          </button>
        </div>
      )}

      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={center}
          defaultZoom={12}
          mapId="staff-introduction-map"
          className="w-full h-full"
          data-testid="google-map"
          mapTypeControl={false}
          fullscreenControl={false}
          streetViewControl={false}
          gestureHandling="greedy"
          clickableIcons={false}
          disableDoubleClickZoom={false}
        >
          <MapEventHandler onRightClick={handleMapRightClick} />
          <MapCenterController stores={stores} searchQuery={searchQuery} />
          {stores &&
            stores.map((store) => {
              const isSelected = store.id === selectedStoreId;
              return (
                <AdvancedMarker
                  key={store.id}
                  position={{
                    lat: parseFloat(store.latitude),
                    lng: parseFloat(store.longitude),
                  }}
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
        open={!!selectedStore && !showAddForm}
        onClose={handlePanelClose}
      />

      <AddStoreForm
        open={showAddForm}
        onClose={handleCloseAddForm}
        location={selectedLocation}
        onStoreAdded={handleStoreAdded}
      />
    </div>
  );
}
