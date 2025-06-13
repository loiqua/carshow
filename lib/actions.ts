"use server";

import { prisma } from "@/lib/prisma";
import { AppointmentSchema, TAppointmentSchema, ContactSchema, TContactSchema } from "@/lib/schemas";

// Placeholder pour l'email de l'admin. Idéalement, à stocker dans les variables d'environnement.
const emailAdmin = process.env.ADMIN_EMAIL ?? "admin@example.com";

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

export async function sendContactMessage(data: TContactSchema) {
  const validationResult = ContactSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: "Les données fournies sont invalides.",
    };
  }

  try {
    // Simulation de l'envoi d'email à l'admin
    console.log("--- NOUVEAU MESSAGE DE CONTACT ---");
    console.log(`De: ${validationResult.data.name} <${validationResult.data.email}>`);
    console.log(`Sujet: ${validationResult.data.subject}`);
    console.log(`Message: ${validationResult.data.message}`);
    console.log("-----------------------------------");

    // Ici, vous pourriez aussi sauvegarder le message dans la base de données si vous le souhaitez
    // await prisma.contactMessage.create({ data: validationResult.data });

    return {
      success: true,
      message: "Votre message a été envoyé avec succès.",
    };
  } catch (error) {
    console.error("Erreur lors de l'envoi du message de contact:", error);
    return {
      success: false,
      message: "Une erreur est survenue lors de l'envoi du message.",
    };
  }
}
