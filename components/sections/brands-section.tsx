"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function BrandsSection() {
  const brands = ['Mercedes', 'BMW', 'Audi', 'Porsche', 'Ferrari', 'Lamborghini'];
  
  return (
    <section className="w-full py-12 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-6 text-center"
        >
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Nos marques premium
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Découvrez notre sélection des meilleures marques automobiles du marché.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-8 w-full">
            {brands.map((brand, index) => (
              <Link 
                href={`/search?brand=${encodeURIComponent(brand)}&motorType=all_motor_types&color=all_colors&type=all_vehicle_types`}
                key={brand}
                className="no-underline"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center space-y-3"
                >
                  <div className="p-4 bg-muted rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-muted/80 border border-primary/10">
                    <div className="w-20 h-20 flex items-center justify-center">
                      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/70">
                        {brand}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-foreground">{brand}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
