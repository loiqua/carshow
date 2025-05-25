# Documentation des Composants Réutilisables

Ce document décrit les composants réutilisables de l'application Car Show, leurs propriétés et leur utilisation.

## Composants UI de Base

### [Button](./components/ui/button.tsx)

Le composant Button est basé sur shadcn UI et offre une interface cohérente pour tous les boutons de l'application.

```tsx
import { Button } from "@/components/ui/button";

// Variantes disponibles: default, destructive, outline, secondary, ghost, link
<Button variant="default">Bouton standard</Button>
<Button variant="destructive">Supprimer</Button>
<Button variant="outline">Aperçu</Button>
<Button variant="secondary">Secondaire</Button>
<Button variant="ghost">Fantôme</Button>
<Button variant="link">Lien</Button>

// Tailles disponibles: default, sm, lg
<Button size="default">Taille standard</Button>
<Button size="sm">Petit</Button>
<Button size="lg">Grand</Button>
```

### [Card](./components/ui/card.tsx)

Le composant Card permet d'afficher des informations dans un conteneur stylisé et est utilisé pour présenter les voitures.

```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Titre de la voiture</CardTitle>
    <CardDescription>Description brève</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Contenu principal */}
  </CardContent>
  <CardFooter>
    {/* Actions ou informations complémentaires */}
  </CardFooter>
</Card>
```

### [Navbar](./components/ui/navbar.tsx)

La barre de navigation principale de l'application.

```tsx
import { Navbar } from "@/components/ui/navbar";

<Navbar />
```

Propriétés optionnelles:
- `transparent?: boolean` - Rend la navbar transparente pour la page d'accueil
- `links?: { href: string; label: string }[]` - Liens de navigation personnalisés

### [Footer](./components/ui/footer.tsx)

Le pied de page de l'application.

```tsx
import { Footer } from "@/components/ui/footer";

<Footer />
```

## Composants Spécifiques à l'Application

### [CarCard](./components/cars/car-card.tsx)

Utilisé pour afficher une voiture dans la liste.

```tsx
import { CarCard } from "@/components/cars/car-card";

<CarCard car={carData} />
```

Propriétés:
- `car: Car` - Données de la voiture à afficher (incluant les images associées)
- `showActions?: boolean` - Affiche ou non les boutons d'action

### [AppointmentForm](./components/appointments/appointment-form.tsx)

Formulaire de prise de rendez-vous.

```tsx
import { AppointmentForm } from "@/components/appointments/appointment-form";

<AppointmentForm carId={car.id} />
```

Propriétés:
- `carId: number` - ID de la voiture pour laquelle prendre rendez-vous
- `onSuccess?: () => void` - Callback appelé après soumission réussie

## Providers

### [ThemeProvider](./providers/theme-provider.tsx)

Gère le thème clair/sombre de l'application.

```tsx
import { ThemeProvider } from "@/providers/theme-provider";

<ThemeProvider>
  {/* Contenu de l'application */}
</ThemeProvider>
```

### [AuthProvider](./providers/auth-provider.tsx)

Gère l'authentification de l'application.

```tsx
import { AuthProvider } from "@/providers/auth-provider";

<AuthProvider>
  {/* Contenu de l'application */}
</AuthProvider>
```