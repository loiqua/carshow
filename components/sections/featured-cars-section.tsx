"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function FeaturedCarsSection() {
  const featuredCars = [
    { id: 'car1', name: 'Mercedes S-Class', brand: 'Mercedes', model: 'S-Class', price: '95,000' },
    { id: 'car2', name: 'BMW 7 Series', brand: 'BMW', model: '7 Series', price: '86,000' },
    { id: 'car3', name: 'Audi A8', brand: 'Audi', model: 'A8', price: '82,000' },
    { id: 'car4', name: 'Porsche 911', brand: 'Porsche', model: '911', price: '105,000' },
    { id: 'car5', name: 'Ferrari Roma', brand: 'Ferrari', model: 'Roma', price: '220,000' },
    { id: 'car6', name: 'Lamborghini Huracán', brand: 'Lamborghini', model: 'Huracán', price: '260,000' }
  ];

  return (
    <section className="w-full py-12 md:py-24 bg-muted relative overflow-hidden">
      {/* Cercles décoratifs */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-6 text-center"
        >
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Véhicules en vedette
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Explorez notre sélection de véhicules exclusifs choisis pour vous.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full">
            {featuredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-lg border bg-background shadow-md transition-all hover:shadow-xl hover:border-primary/20"
              >
                <div className="aspect-video overflow-hidden">
                  <Image
                    alt={car.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    src={`https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&q=80`}
                    width={500}
                    height={310}
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold">{car.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{car.brand} • {car.model}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-bold text-primary">€{car.price}</span>
                    <Link href={`/search/${car.id}`}>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                      >
                        Voir détails
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <Link href="/search">
              <Button size="lg" className="shadow-lg hover:shadow-primary/20 transition-all hover:scale-105">
                Voir tous les véhicules
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}