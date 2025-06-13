"use client";

import Image from "next/image";
import Link from "next/link";
import { Car, Image as CarImage } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";

export interface CarWithImages extends Car {
  readonly images: CarImage[];
}

interface CarCardProps {
  readonly car: CarWithImages;
  readonly showActions?: boolean;
}

export function CarCard({ car, showActions = true }: CarCardProps) {
  // Utiliser des images en ligne pour les voitures
  const getImageForCar = (car: CarWithImages): string => {
    // Mapper les marques aux images Unsplash
    const brandMap: Record<string, string> = {
      "Mercedes-Benz": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2000&auto=format&fit=crop",
      "BMW": "https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?q=80&w=2000&auto=format&fit=crop",
      "Audi": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2000&auto=format&fit=crop",
      "Porsche": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop",
      "Ferrari": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2000&auto=format&fit=crop",
      "Lamborghini": "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2000&auto=format&fit=crop",
    };
    
    // Vérifier si l'URL est externe (commence par http ou https)
    const isExternalUrl = (url: string) => url.startsWith('http://') || url.startsWith('https://');
    
    // Si la voiture a des images et qu'elles sont des URLs externes, les utiliser
    if (car.images.length > 0 && isExternalUrl(car.images[0].url)) {
      return car.images[0].url;
    }
    
    // Sinon, utiliser une image basée sur la marque
    return brandMap[car.brand] || "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2000&auto=format&fit=crop";
  };
  
  const mainImage = getImageForCar(car);

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={mainImage}
          alt={`${car.brand} ${car.model}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={false}
          onError={(e) => {
            // En cas d'erreur, utiliser une image alternative basée sur la marque
            const target = e.target as HTMLImageElement;
            const brand = car.brand;
            const fallbackImages: Record<string, string> = {
              "Mercedes-Benz": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2000&auto=format&fit=crop",
              "BMW": "https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?q=80&w=2000&auto=format&fit=crop",
              "Audi": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2000&auto=format&fit=crop",
              "Porsche": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop",
              "Ferrari": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2000&auto=format&fit=crop",
              "Lamborghini": "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2000&auto=format&fit=crop"
            };
            target.src = fallbackImages[brand] || "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2000&auto=format&fit=crop";
          }}
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1 text-xl">{car.brand} {car.model}</CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span className="font-semibold text-primary">{formatCurrency(car.price)}</span>
          <span className="text-sm text-muted-foreground">{car.motorType}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Puissance</span>
            <span>{car.power}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Type</span>
            <span>{car.type}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Couleur</span>
            <span>{car.color}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Places</span>
            <span>{car.placeNumber}</span>
          </div>
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{car.description}</p>
      </CardContent>

      {showActions && (
        <CardFooter className="p-4 pt-0 mt-auto">
          <Button asChild className="w-full">
            <Link href={`/cars/${car.id}`}>
              Prendre rendez-vous
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
