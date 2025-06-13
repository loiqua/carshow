"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { CarFilter, FilterValues } from "@/components/cars/car-filter";
import { CarCard, CarWithImages } from "@/components/cars/car-card";

export default function CarSearch() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<CarWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getInitialFilters = useCallback((): FilterValues => {
    return {
      brand: searchParams.get("brand") ?? "",
      model: searchParams.get("model") ?? "",
      minPrice: searchParams.get("minPrice") ?? "",
      maxPrice: searchParams.get("maxPrice") ?? "",
      motorType: searchParams.get("motorType") ?? "",
      color: searchParams.get("color") ?? "",
      type: searchParams.get("type") ?? "",
    };
  }, [searchParams]);

  const buildSearchUrl = useCallback((filters: FilterValues): string => {
    const params = new URLSearchParams();
    
    if (filters.brand && filters.brand !== "all_brands") params.append("brand", filters.brand);
    if (filters.model) params.append("model", filters.model);
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
    if (filters.motorType && filters.motorType !== "all_motor_types") params.append("motorType", filters.motorType);
    if (filters.color && filters.color !== "all_colors") params.append("color", filters.color);
    if (filters.type && filters.type !== "all_vehicle_types") params.append("type", filters.type);
    
    return `/api/cars?${params.toString()}`;
  }, []);

  const loadCars = useCallback(async (filters: FilterValues) => {
    try {
      setLoading(true);
      setError(null);
      
      const url = buildSearchUrl(filters);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des voitures");
      }
      
      const data = await response.json();
      setCars(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  }, [buildSearchUrl]);

  const handleFilter = (values: FilterValues) => {
    loadCars(values);
    
    const url = new URL(window.location.href);
    const filteredValues = Object.entries(values).filter(([, v]) => v !== "" && !v.startsWith("all_"));
    url.search = new URLSearchParams(filteredValues as [string, string][]).toString();
    
    window.history.pushState({}, "", url.toString());
  };
  
  useEffect(() => {
    const initialFilters = getInitialFilters();
    loadCars(initialFilters);
  }, [getInitialFilters, loadCars]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="rounded-lg bg-red-100 p-4 text-center text-red-800">{error}</div>
      );
    }
    
    if (cars.length === 0) {
      return (
        <div className="rounded-lg bg-gray-100 p-8 text-center dark:bg-gray-800">
          <h3 className="text-xl font-medium">Aucun véhicule trouvé</h3>
          <p className="mt-2 text-muted-foreground">
            Essayez de modifier vos critères de recherche pour voir plus de résultats.
          </p>
        </div>
      );
    }
    
    return (
      <>
        <p className="mb-4 text-muted-foreground">
          {`${cars.length} véhicule${cars.length > 1 ? "s" : ""} trouvé${cars.length > 1 ? "s" : ""}`}
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={`car-${car.id}`} car={car} />
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="mb-8">
        <CarFilter onFilter={handleFilter} initialValues={getInitialFilters()} />
      </div>
      {renderContent()}
    </>
  );
}
