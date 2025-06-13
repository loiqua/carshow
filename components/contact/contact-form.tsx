"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, TContactSchema } from "@/lib/schemas";
import { sendContactMessage } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTransition, useState } from "react";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TContactSchema>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = (data: TContactSchema) => {
    setResult(null);
    startTransition(async () => {
      const response = await sendContactMessage(data);
      setResult(response);
      if (response.success) {
        reset();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet</Label>
          <Input id="name" {...register("name")} placeholder="John Doe" />
          {errors.name && <p className="text-sm font-medium text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Adresse e-mail</Label>
          <Input id="email" type="email" {...register("email")} placeholder="john.doe@exemple.com" />
          {errors.email && <p className="text-sm font-medium text-destructive">{errors.email.message}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Sujet</Label>
        <Input id="subject" {...register("subject")} placeholder="Demande d'information" />
        {errors.subject && <p className="text-sm font-medium text-destructive">{errors.subject.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Votre message</Label>
        <Textarea id="message" {...register("message")} rows={6} placeholder="Comment pouvons-nous vous aider ?" />
        {errors.message && <p className="text-sm font-medium text-destructive">{errors.message.message}</p>}
      </div>
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Envoi en cours..." : "Envoyer le message"}
      </Button>
      {result && (
        <p className={`text-sm font-medium ${result.success ? 'text-green-600' : 'text-destructive'}`}>
          {result.message}
        </p>
      )}
    </form>
  );
}
