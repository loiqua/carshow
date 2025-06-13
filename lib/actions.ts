"use server";

import { prisma } from "@/lib/prisma";
import { AppointmentSchema, TAppointmentSchema } from "@/lib/schemas";

// Placeholder pour l'email de l'admin. Idéalement, à stocker dans les variables d'environnement.
const emailAdmin = process.env.ADMIN_EMAIL || "admin@example.com";

export async function createAppointment(data: TAppointmentSchema) {
  const validationResult = AppointmentSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: "Les données fournies sont invalides.",
    };
  }

  try {
    const newAppointment = await prisma.appointment.create({
      data: validationResult.data,
    });

    // Simulation de l'envoi d'email
    console.log("--- NOUVEAU RENDEZ-VOUS ---");
    console.log(`Email envoyé à: ${emailAdmin}`);
    console.log(`Détails:`, newAppointment);
    console.log("---------------------------");

    return {
      success: true,
      message: "Rendez-vous créé avec succès.",
      data: newAppointment,
    };
  } catch (error) {
    console.error("Erreur lors de la création du rendez-vous:", error);
    return {
      success: false,
      message: "Une erreur est survenue lors de la création du rendez-vous.",
    };
  }
}
