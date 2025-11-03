"use client";

import { Store } from "@/shared/schema";
import { Phone, MapPin, ExternalLink, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface StaffPanelProps {
  store: Store | null;
  open: boolean;
  onClose: () => void;
}

export function StaffPanel({ store, open, onClose }: StaffPanelProps) {
  if (!store) return null;

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`;
    window.open(url, "_blank");
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent 
        side="left" 
        className="w-[75%] sm:w-[384px] overflow-y-auto"
        data-testid="staff-panel"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold" data-testid="staff-name">
            {store.staffName}
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-4" data-testid="company-name">
              {store.companyName}
            </p>
            
            <Separator className="my-4" />
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3" data-testid="store-name">
              {store.storeName}
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600" data-testid="store-address">
                  {store.address}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <a
                  href={`tel:${store.tel}`}
                  className="text-sm text-blue-600 hover:underline"
                  data-testid="store-tel"
                >
                  {store.tel}
                </a>
              </div>

              {store.sns && (
                <div className="flex items-center gap-3">
                  <Share2 className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-600" data-testid="store-sns">
                    {store.sns}
                  </span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <Button
            onClick={handleDirections}
            className="w-full gap-2 hover-elevate active-elevate-2"
            data-testid="directions-button"
          >
            <ExternalLink className="h-4 w-4" />
            ルートを検索
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
