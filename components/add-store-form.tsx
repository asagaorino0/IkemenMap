"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Store } from "@/shared/schema";
import { addStore } from "@/lib/actions";
import { Loader2 } from "lucide-react";

interface AddStoreFormProps {
  open: boolean;
  onClose: () => void;
  location: { lat: number; lng: number } | null;
  onStoreAdded: (store: Store) => void;
}

export function AddStoreForm({ open, onClose, location, onStoreAdded }: AddStoreFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    storeName: "",
    address: "",
    tel: "",
    sns: "",
    staffName: "",
  });

  useEffect(() => {
    if (location && open) {
      setIsLoadingAddress(true);
      const geocoder = new google.maps.Geocoder();
      const latLng = new google.maps.LatLng(location.lat, location.lng);

      geocoder.geocode({ location: latLng }, (results, status) => {
        setIsLoadingAddress(false);
        if (status === "OK" && results && results[0]) {
          let address = results[0].formatted_address;
          address = address.replace(/^日本、〒\d{3}-\d{4}\s+/, '');
          setFormData(prev => ({ ...prev, address }));
        } else {
          console.error("住所の取得に失敗しました:", status);
        }
      });
    }
  }, [location, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return;

    setIsSubmitting(true);
    try {
      const newStore = await addStore({
        ...formData,
        latitude: location.lat.toString(),
        longitude: location.lng.toString(),
      });

      if (newStore) {
        onStoreAdded(newStore);
        setFormData({
          companyName: "",
          storeName: "",
          address: "",
          tel: "",
          sns: "",
          staffName: "",
        });
      }
    } catch (error) {
      console.error("掲載エラー:", error);
      alert("掲載に失敗しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] sm:w-[384px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>新規掲載</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="staffName">スタッフ名 *</Label>
            <Input
              id="staffName"
              required
              value={formData.staffName}
              onChange={(e) => handleChange("staffName", e.target.value)}
              placeholder="山田太郎"
              data-testid="form-staff-name"
            />
          </div>

          <div>
            <Label htmlFor="companyName">会社名 *</Label>
            <Input
              id="companyName"
              required
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              placeholder="イケメン株式会社"
              data-testid="form-company-name"
            />
          </div>

          <div>
            <Label htmlFor="storeName">店舗名 *</Label>
            <Input
              id="storeName"
              required
              value={formData.storeName}
              onChange={(e) => handleChange("storeName", e.target.value)}
              placeholder="渋谷センター店"
              data-testid="form-store-name"
            />
          </div>

          <div>
            <Label htmlFor="address">住所 *</Label>
            <Input
              id="address"
              required
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder={isLoadingAddress ? "住所を取得中..." : "東京都渋谷区..."}
              disabled={isLoadingAddress}
              data-testid="form-address"
            />
          </div>

          <div>
            <Label htmlFor="tel">電話番号 *</Label>
            <Input
              id="tel"
              required
              type="tel"
              value={formData.tel}
              onChange={(e) => handleChange("tel", e.target.value)}
              placeholder="03-1234-5678"
              data-testid="form-tel"
            />
          </div>

          <div>
            <Label htmlFor="sns">SNS（オプション）</Label>
            <Input
              id="sns"
              value={formData.sns}
              onChange={(e) => handleChange("sns", e.target.value)}
              placeholder="@username"
              data-testid="form-sns"
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-md text-sm">
            <p className="text-gray-600">選択した位置:</p>
            <p className="text-gray-900 font-mono text-xs mt-1">
              緯度: {location?.lat.toFixed(6)}
            </p>
            <p className="text-gray-900 font-mono text-xs">
              経度: {location?.lng.toFixed(6)}
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
              data-testid="form-cancel-button"
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
              data-testid="form-submit-button"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  掲載中...
                </>
              ) : (
                "掲載する"
              )}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
