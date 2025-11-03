"use client";

import { Store } from "@/shared/schema";
import { Phone, MapPin, ExternalLink } from "lucide-react";
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
                  <svg
                    className="h-5 w-5 text-gray-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  <a
                    href={store.sns.startsWith("@") ? `https://twitter.com/${store.sns.slice(1)}` : store.sns}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                    data-testid="store-sns"
                  >
                    {store.sns}
                  </a>
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
