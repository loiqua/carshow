"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { CarFilter, FilterValues } from "@/components/cars/car-filter";
import { CarCard, CarWithImages } from "@/components/cars/car-card";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export default function CarsPage() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<CarWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Récupérer les paramètres de recherche initiaux depuis l'URL
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

  // Fonction pour construire l'URL de recherche avec les filtres
  const buildSearchUrl = useCallback((filters: FilterValues): string => {
    const params = new URLSearchParams();
    
    if (filters.brand) params.append("brand", filters.brand);
    if (filters.model) params.append("model", filters.model);
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
    if (filters.motorType) params.append("motorType", filters.motorType);
    if (filters.color) params.append("color", filters.color);
    if (filters.type) params.append("type", filters.type);
    
    return `/api/cars?${params.toString()}`;
  }, []);

  // Charger les voitures avec les filtres spécifiés
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
      console.error("Erreur de chargement des voitures:", err);
    } finally {
      setLoading(false);
    }
  }, [buildSearchUrl, setCars, setError, setLoading]);

  // Gérer le filtre lorsqu'il est appliqué
  const handleFilter = (values: FilterValues) => {
    loadCars(values);
    
    // Mettre à jour l'URL avec les filtres (optionnel, pour permettre le partage)
    const url = new URL(window.location.href);
    url.search = new URLSearchParams(
      Object.entries(values).filter(([, v]) => v !== "")
    ).toString();
    
    window.history.pushState({}, "", url.toString());
  };
  
  // Fonction pour rendre le contenu en fonction de l'état
  const renderContent = () => {
    // Afficher l'indicateur de chargement
    if (loading) {
      return (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      );
    }
    
    // Afficher l'erreur s'il y en a une
    if (error) {
      return (
        <div className="rounded-lg bg-red-100 p-4 text-center text-red-800">
          {error}
        </div>
      );
    }
    
    // Afficher un message si aucun véhicule n'est trouvé
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
    
    // Afficher les résultats de la recherche
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

  // Charger les voitures au chargement initial
  useEffect(() => {
    const initialFilters = getInitialFilters();
    loadCars(initialFilters);
  }, [getInitialFilters, loadCars]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-3xl font-bold">Nos véhicules premium</h1>
        
        <div className="mb-8">
          <CarFilter onFilter={handleFilter} />
        </div>

        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}