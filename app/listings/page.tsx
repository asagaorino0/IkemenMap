import { getAllStores } from "@/lib/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Share2 } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function ListingsPage() {
  const stores = await getAllStores();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900" data-testid="listings-title">
              掲載一覧
            </h1>
            <p className="text-gray-600 mt-2" data-testid="listings-description">
              投稿日順にスタッフを表示しています
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <Link key={store.id} href={`/?storeId=${store.id}`}>
                <Card
                  className="hover:shadow-lg transition-shadow cursor-pointer hover-elevate active-elevate-2 h-full"
                  data-testid={`store-card-${store.id}`}
                >
                  <CardHeader>
                    <CardTitle className="text-xl" data-testid="card-staff-name">
                      {store.staffName}
                    </CardTitle>
                    <CardDescription data-testid="card-company-name">
                      {store.companyName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-2" data-testid="card-store-name">
                          {store.storeName}
                        </h4>
                      </div>

                      <Separator />

                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span data-testid="card-address">{store.address}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <span className="text-blue-600" data-testid="card-tel">
                          {store.tel}
                        </span>
                      </div>

                      {store.sns && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Share2 className="h-4 w-4 flex-shrink-0" />
                          <span data-testid="card-sns">{store.sns}</span>
                        </div>
                      )}

                      <Separator />

                      <div className="pt-2">
                        <p className="text-xs text-gray-500" data-testid="card-posted-date">
                          投稿日: {format(new Date(store.postedAt), "yyyy年MM月dd日", { locale: ja })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {stores.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500" data-testid="no-stores-message">
                スタッフが見つかりませんでした
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
