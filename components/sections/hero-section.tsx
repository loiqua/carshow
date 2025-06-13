"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted relative overflow-hidden">
      {/* Cercle décoratif en arrière-plan */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-center lg:text-left"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Découvrez l&apos;excellence automobile
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
              Notre sélection exclusive de véhicules premium vous attend. Trouvez la voiture de vos rêves avec Car Show.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center lg:justify-start">
              <Link href="/search">
                <Button size="lg" className="shadow-lg hover:shadow-primary/20 transition-all hover:scale-105 w-full sm:w-auto">
                  Explorer nos véhicules
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-primary/20 hover:border-primary transition-all w-full sm:w-auto">
                  Nous contacter
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto lg:ml-auto max-w-md lg:max-w-none"
          >
            <div className="aspect-video overflow-hidden rounded-xl shadow-2xl transform transition-transform duration-300 hover:scale-[1.02] ring-1 ring-primary/10">
              <Image
                alt="Car Showcase"
                className="object-cover w-full h-full"
                height={360}
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000"
                width={640}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        </div>
        
        {/* Indicateur de défilement */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center">
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-primary/60"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mouse"><rect x="6" y="3" width="12" height="18" rx="6"/><path d="M12 7v4"/></svg>
          </motion.div>
          <span className="text-xs text-muted-foreground mt-2">Défiler pour découvrir</span>
        </div>
      </div>
    </section>
  );
}