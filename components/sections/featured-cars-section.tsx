"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Car } from "@prisma/client";

// Type pour les images de voiture
interface CarImage {
  id: number;
  url: string;
  carId: number;
  createdAt: Date;
  updatedAt: Date;
}

export function FeaturedCarsSection() {
  const [featuredCars, setFeaturedCars] = useState<(Car & { images: CarImage[] })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const response = await fetch('/api/cars/featured');
        if (response.ok) {
          const data = await response.json();
          setFeaturedCars(data);
        } else {
          console.error('Erreur lors du chargement des véhicules');
        }
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCars();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-12 md:py-24 bg-muted relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="text-center">Chargement des véhicules en vedette...</div>
        </div>
      </section>
    );
  }

  // Fonction pour obtenir l'image d'une voiture
  const getImageForCar = (car: Car & { images?: Array<{ url: string }> }): string => {
    // Vérifier si la voiture a des images avec une URL valide en utilisant le chaînage optionnel
    const imageUrl = car.images?.[0]?.url;
    
    // Si une URL valide est trouvée et qu'elle est une URL externe, la retourner
    if (imageUrl && (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'))) {
      return imageUrl;
    }
    
    // Si l'URL n'est pas valide, retourner une image par défaut basée sur la marque
    return getDefaultImageForBrand(car.brand);
  };
  
  // Fonction utilitaire pour obtenir une image par défaut basée sur la marque
  const getDefaultImageForBrand = (brand: string): string => {
    // Mapper les marques aux images Unsplash
    const brandMap: Record<string, string> = {
      "Mercedes-Benz": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2000&auto=format&fit=crop",
      "BMW": "https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?q=80&w=2000&auto=format&fit=crop",
      "Audi": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2000&auto=format&fit=crop",
      "Porsche": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop",
      "Ferrari": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2000&auto=format&fit=crop",
      "Lamborghini": "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2000&auto=format&fit=crop",
      // Valeur par défaut si la marque n'est pas reconnue
      "default": "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2000&auto=format&fit=crop"
    };
    
    // Retourner l'image correspondant à la marque, ou l'image par défaut
    return brandMap[brand] || brandMap.default;
  };

  return (
    <section className="w-full py-12 md:py-24 bg-muted relative overflow-hidden">
      {/* Cercles décoratifs */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-6 text-center"
        >
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Véhicules en vedette
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Explorez notre sélection de véhicules exclusifs choisis pour vous.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full">
            {featuredCars.map((car, index) => {
              const mainImage = getImageForCar(car);
              return (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-background rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={mainImage}
                      alt={`${car.brand} ${car.model}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold">{car.brand} {car.model}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{car.brand} • {car.model}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-bold text-primary">{car.price.toLocaleString('fr-FR')} €</span>
                      <Link href={`/search?brand=${encodeURIComponent(car.brand)}`}>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                        >
                          Voir détails
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <Link href="/search">
              <Button size="lg" className="shadow-lg hover:shadow-primary/20 transition-all hover:scale-105">
                Voir tous les véhicules
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}