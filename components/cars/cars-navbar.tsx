"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Tous les véhicules", href: "/cars" },
  { label: "Berlines", href: "/cars?type=Berline" },
  { label: "SUV", href: "/cars?type=SUV" },
  { label: "Coupés", href: "/cars?type=Coupé" },
  { label: "Cabriolets", href: "/cars?type=Cabriolet" },
];

export function CarsNavbar() {
  const pathname = usePathname();
  const currentPath = pathname.split("?")[0]; // Ignorer les paramètres de requête pour la comparaison

  return (
    <div className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link 
            href="/cars" 
            className="mr-6 flex items-center space-x-2 font-semibold"
          >
            <span className="hidden sm:inline-block">Catalogue Véhicules</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = item.href.split("?")[0] === currentPath;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    isActive ? "text-foreground font-semibold" : "text-foreground/60"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button asChild variant="outline" className="w-full md:w-auto">
              <Link href="/">Retour à l&apos;accueil</Link>
            </Button>
          </div>
          <nav className="flex items-center md:hidden">
            <div className="relative">
              <select
                className="h-9 w-full appearance-none rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                onChange={(e) => {
                  window.location.href = e.target.value;
                }}
                defaultValue={pathname}
              >
                {navItems.map((item) => (
                  <option key={item.href} value={item.href}>
                    {item.label}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-3 top-2.5 h-4 w-4 opacity-50"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
