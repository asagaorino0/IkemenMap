"use client";

import { useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { Store } from "@/shared/schema";
import { StaffPanel } from "./staff-panel";

interface MapViewProps {
  stores: Store[];
}

export function MapView({ stores }: MapViewProps) {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const center = stores.length > 0
    ? { lat: stores[0].latitude, lng: stores[0].longitude }
    : { lat: 35.6812, lng: 139.7671 };

  return (
    <div className="relative w-full h-screen">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={center}
          defaultZoom={12}
          mapId="staff-introduction-map"
          className="w-full h-full"
        >
          {stores.map((store) => (
            <AdvancedMarker
              key={store.id}
              position={{ lat: store.latitude, lng: store.longitude }}
              onClick={() => setSelectedStore(store)}
            >
              <Pin
                background="#1a73e8"
                borderColor="#174ea6"
                glyphColor="#fff"
              />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>

      <StaffPanel
        store={selectedStore}
        onClose={() => setSelectedStore(null)}
      />
    </div>
  );
}
