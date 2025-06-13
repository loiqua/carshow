import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ContactForm } from "@/components/contact/contact-form";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Contactez-nous
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Une question, une suggestion ou besoin d&apos;assistance ? Nous sommes là pour vous aider.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="bg-card p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-card-foreground">Nos coordonnées</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">Adresse</h3>
                    <p className="text-muted-foreground">lot 33GA ivandry Ambojatovo<br />Antananarivo, Madagascar</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">E-mail</h3>
                    <a href="mailto:hei.loiqua@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                      hei.loiqua@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">Téléphone</h3>
                    <a href="tel:+261385137754" className="text-muted-foreground hover:text-primary transition-colors">
                      +261 38 513 77 54
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-card-foreground">Envoyez-nous un message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
