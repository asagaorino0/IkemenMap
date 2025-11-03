import { getAllStores } from "@/lib/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Phone, ArrowLeft } from "lucide-react";

export default async function ListingsPage() {
  const stores = await getAllStores();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Map
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Staff Directory</h1>
          <p className="text-gray-600 mt-2">
            Browse all our staff members and store locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <Card key={store.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{store.staffName}</CardTitle>
                <CardDescription>{store.companyName}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-2">
                      {store.storeName}
                    </h4>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{store.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <a
                      href={`tel:${store.tel}`}
                      className="text-blue-600 hover:underline"
                    >
                      {store.tel}
                    </a>
                  </div>

                  {store.sns && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg
                        className="h-4 w-4 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                      <span>{store.sns}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t">
                    <p className="text-xs text-gray-400">
                      Posted {new Date(store.postedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {stores.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No staff members found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
