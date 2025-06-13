"use client";

import Link from "next/link";
import { Button } from "./button";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Car Show</h3>
            <p className="text-sm text-muted-foreground">
              Découvrez une sélection exclusive de véhicules premium pour tous vos besoins.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                Accueil
              </Link>
              <Link href="/search" className="text-sm text-muted-foreground hover:text-foreground">
                Recherche
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Légal</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Politique de confidentialité
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Conditions d&apos;utilisation
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Prendre contact</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Intéressé par un véhicule? Contactez-nous dès maintenant.
              </p>
              <Link href="/contact">
                <Button variant="outline" size="sm">
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col-reverse md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground mt-4 md:mt-0">
            © {new Date().getFullYear()} Car Show. Tous droits réservés.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Facebook</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Instagram</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Twitter</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
