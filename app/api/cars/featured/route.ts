import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Récupérer les voitures en vedette (par exemple, les 6 dernières ajoutées)
    const featuredCars = await prisma.car.findMany({
      where: {
        status: true, // Uniquement les voitures disponibles
      },
      include: {
        images: {
          take: 1, // Prendre seulement la première image pour l'aperçu
        },
      },
      orderBy: {
        createdAt: 'desc', // Les plus récentes d'abord
      },
      take: 6, // Limiter à 6 véhicules
    });

    // Formater les données pour le composant
    const formattedCars = featuredCars.map(car => ({
      id: car.id,
      name: `${car.brand} ${car.model}`,
      brand: car.brand,
      model: car.model,
      price: car.price,
      imageUrl: car.images[0]?.url || '/placeholder-car.jpg',
      type: car.type,
      motorType: car.motorType,
      color: car.color,
    }));

    return NextResponse.json(formattedCars);
  } catch (error) {
    console.error("Error fetching featured cars:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des véhicules en vedette" },
      { status: 500 }
    );
  }
}
