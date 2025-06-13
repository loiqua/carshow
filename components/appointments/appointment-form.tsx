"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppointmentSchema, TAppointmentSchema } from "@/lib/schemas";
import { createAppointment } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransition } from "react";

interface IAppointmentFormProps {
  readonly carId: number;
}

export function AppointmentForm({ carId }: IAppointmentFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TAppointmentSchema>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      carId,
      name: "",
      firstName: "",
      email: "",
      contact: "",
      message: "",
    },
  });

  const onSubmit = (data: TAppointmentSchema) => {
    startTransition(async () => {
      const result = await createAppointment(data);
      if (result.success) {
        alert("Rendez-vous pris avec succès !");
        reset();
      } else {
        alert(`Erreur: ${result.message}`);
      }
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Prendre un rendez-vous</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input id="firstName" {...register("firstName")} />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact</Label>
            <Input id="contact" {...register("contact")} />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="appointmentDate">Date et heure du rendez-vous</Label>
            <Input id="appointmentDate" type="datetime-local" {...register("appointmentDate", { valueAsDate: true })} />
            {errors.appointmentDate && <p className="text-red-500 text-sm">{errors.appointmentDate.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("message")}
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Envoi en cours..." : "Valider le rendez-vous"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
