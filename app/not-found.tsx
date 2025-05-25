"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="container px-4 py-24 md:py-32 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-10"
          >
            <div className="relative mx-auto w-48 h-48 mb-8">
              <motion.div 
                className="absolute inset-0 rounded-full bg-primary/10"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-4 rounded-full bg-primary/20"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 3, delay: 0.2, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl font-bold text-primary">404</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
                Page non trouvée
              </h1>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Désolé, la page que vous cherchez semble avoir pris un virage serré et s&apos;est égarée.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button
                  size="lg"
                  className="shadow-lg hover:shadow-primary/20 transition-all hover:scale-105"
                >
                  Retour à l&apos;accueil
                </Button>
              </Link>
              <Link href="/search">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/20 hover:border-primary transition-all"
                >
                  Explorer nos véhicules
                </Button>
              </Link>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="pt-10 text-muted-foreground"
            >
              <p className="text-sm">
                Vous cherchez peut-être un modèle spécifique ? Essayez notre page de recherche.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
