import { z } from 'zod';

export const AppointmentSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères.' }),
  firstName: z.string().min(2, { message: 'Le prénom doit contenir au moins 2 caractères.' }),
  email: z.string().email({ message: 'Veuillez saisir une adresse e-mail valide.' }),
  contact: z.string().min(10, { message: 'Le numéro de contact doit être valide.' }),
  message: z.string().min(10, { message: 'Votre message doit contenir au moins 10 caractères.' }).max(500),
  appointmentDate: z.date({ required_error: 'Veuillez sélectionner une date et une heure.' }),
  carId: z.number(),
});

export type TAppointmentSchema = z.infer<typeof AppointmentSchema>;

export const ContactSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères.' }),
  email: z.string().email({ message: 'Veuillez saisir une adresse e-mail valide.' }),
  subject: z.string().min(5, { message: 'Le sujet doit contenir au moins 5 caractères.' }),
  message: z.string().min(10, { message: 'Votre message doit contenir au moins 10 caractères.' }).max(1000),
});

export type TContactSchema = z.infer<typeof ContactSchema>;
