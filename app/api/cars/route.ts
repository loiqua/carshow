import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extraire les paramètres de filtrage
    const brand = searchParams.get("brand");
    const model = searchParams.get("model");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const motorType = searchParams.get("motorType");
    const color = searchParams.get("color");
    const type = searchParams.get("type");

    // Construire la requête Prisma avec les filtres
    const whereClause: {
      status: boolean;
      brand?: { contains: string; mode: "insensitive" };
      model?: { contains: string; mode: "insensitive" };
      price?: { gte?: number; lte?: number };
      motorType?: { contains: string; mode: "insensitive" };
      color?: { contains: string; mode: "insensitive" };
      type?: { contains: string; mode: "insensitive" };
    } = {
      status: true, // Uniquement les voitures disponibles
    };

    if (brand && !brand.startsWith('all_')) {
      whereClause.brand = {
        contains: brand,
        mode: "insensitive",
      };
    }

    if (model) {
      whereClause.model = {
        contains: model,
        mode: "insensitive",
      };
    }

    if (minPrice) {
      whereClause.price = {
        ...whereClause.price,
        gte: parseFloat(minPrice),
      };
    }

    if (maxPrice) {
      whereClause.price = {
        ...whereClause.price,
        lte: parseFloat(maxPrice),
      };
    }

    if (motorType && !motorType.startsWith('all_')) {
      whereClause.motorType = {
        contains: motorType,
        mode: "insensitive",
      };
    }

    if (color && !color.startsWith('all_')) {
      whereClause.color = {
        contains: color,
        mode: "insensitive",
      };
    }

    if (type && !type.startsWith('all_')) {
      whereClause.type = {
        contains: type,
        mode: "insensitive",
      };
    }

    // Récupérer les voitures avec leurs images
    const cars = await prisma.car.findMany({
      where: whereClause,
      include: {
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des voitures" },
      { status: 500 }
    );
  }
}