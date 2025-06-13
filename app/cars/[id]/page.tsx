import { prisma } from "@/lib/prisma";
import { AppointmentForm } from "@/components/appointments/appointment-form";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Car, Cog, Palette, Users } from "lucide-react";

interface ICarDetailPageProps {
  readonly params: { readonly id: string };
}

async function getCarDetails(id: number) {
  const car = await prisma.car.findUnique({
    where: { id },
    include: { images: true },
  });
  return car;
}

export default async function CarDetailPage({ params }: ICarDetailPageProps) {
  const carId = parseInt(params.id, 10);

  if (isNaN(carId)) {
    return notFound();
  }

  const car = await getCarDetails(carId);

  if (!car) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="outline">
          <Link href="/search">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la recherche
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
          {car.images.length > 0 ? (
            <div className="relative w-full aspect-video rounded-lg shadow-lg overflow-hidden">
              <Image
                src={car.images[0].url}
                alt={car.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">Image non disponible</span>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">{car.brand} {car.model}</h1>
          <p className="text-3xl font-bold text-primary mb-6">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(car.price)}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-muted-foreground" />
              <span>{car.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Cog className="h-5 w-5 text-muted-foreground" />
              <span>{car.motorType} - {car.power}</span>
            </div>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-muted-foreground" />
              <span>{car.color}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span>{car.placeNumber} places</span>
            </div>
          </div>

          <p className="text-muted-foreground mb-8">{car.description}</p>

          <AppointmentForm carId={car.id} />
        </div>
      </div>
    </div>
  );
}
