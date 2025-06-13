import { Suspense } from "react";
import CarSearch from "@/components/cars/car-search";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

function SearchPageSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-md h-64 animate-pulse"></div>
      <div className="flex h-40 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-3xl font-bold">Nos véhicules premium</h1>
        <Suspense fallback={<SearchPageSkeleton />}>
          <CarSearch />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}