# Conventions de Nommage et Meilleures Pratiques

Ce document définit les conventions de nommage et les meilleures pratiques à suivre pour le projet Car Show.

## Structure du Projet

```
car-show/
├── app/              # Routes et pages Next.js
├── components/       # Composants React réutilisables
│   ├── ui/           # Composants UI de base
│   ├── cars/         # Composants liés aux voitures
│   └── appointments/ # Composants liés aux rendez-vous
├── lib/              # Utilitaires et fonctions partagées
├── prisma/           # Schéma Prisma et migrations
├── public/           # Fichiers statiques
└── providers/        # Providers React Context
```

## Conventions de Nommage

### Fichiers et Dossiers

- **Composants React** : PascalCase pour les fichiers de composants (`Button.tsx`, `CarCard.tsx`)
- **Utilitaires et hooks** : camelCase (`useAuth.ts`, `formatPrice.ts`)
- **Pages et routes** : kebab-case pour les routes, camelCase pour les fichiers (`page.tsx`, `layout.tsx`)
- **Dossiers** : kebab-case pour tous les dossiers (`components/ui`, `components/cars`)

### Code TypeScript/JavaScript

- **Variables et fonctions** : camelCase
  ```typescript
  const carPrice = 25000;
  function calculateTotalPrice() { ... }
  ```

- **Composants React** : PascalCase
  ```typescript
  export function CarDetail() { ... }
  ```

- **Interfaces et Types** : PascalCase avec préfixe `I` pour les interfaces et `T` pour les types
  ```typescript
  interface ICar { ... }
  type TAppointmentStatus = 'pending' | 'confirmed' | 'canceled';
  ```

- **Enums** : PascalCase
  ```typescript
  enum CarType { Sedan, SUV, Coupe }
  ```

- **Constantes** : UPPER_SNAKE_CASE pour les constantes globales
  ```typescript
  const MAX_CARS_PER_PAGE = 12;
  ```

### CSS et Classes

- **Classes CSS** : kebab-case
  ```css
  .car-card { ... }
  .hero-section { ... }
  ```

- **Classes Tailwind** : suivre la notation de Tailwind
  ```html
  <div className="flex items-center justify-between p-4">
  ```

## Meilleures Pratiques

### Composants React

1. **Séparation des responsabilités** : Chaque composant devrait avoir une seule responsabilité
2. **Props typées** : Toujours définir des interfaces pour les props
   ```typescript
   interface ButtonProps {
     variant?: 'default' | 'outline';
     children: React.ReactNode;
   }
   ```
3. **Props en lecture seule** : Utiliser `readonly` pour les props
   ```typescript
   interface CardProps {
     readonly title: string;
     readonly children: React.ReactNode;
   }
   ```
4. **Composants fonctionnels** : Utiliser des composants fonctionnels avec des hooks plutôt que des classes

### TypeScript

1. **Utiliser TypeScript strictement** : Activer `strict: true` dans `tsconfig.json`
2. **Éviter `any`** : Éviter d'utiliser le type `any` quand c'est possible
3. **Nullable explicite** : Utiliser des types explicites pour les valeurs potentiellement nulles
   ```typescript
   function getCar(id: number): Car | null { ... }
   ```

### Prisma et Base de Données

1. **Nommage des modèles** : PascalCase pour les modèles, pluriels en anglais
2. **Clés primaires** : Utiliser `id` comme nom de clé primaire
3. **Relations explicites** : Définir explicitement les relations entre modèles
4. **Timestamps** : Toujours inclure `createdAt` et `updatedAt` dans les modèles

### État et Gestion des Effets

1. **État localisé** : Maintenir l'état au niveau le plus bas possible
2. **Dépendances des effets** : Toujours spécifier les dépendances dans les tableaux de dépendances des hooks d'effets
   ```typescript
   useEffect(() => {
     // effect
   }, [dependency1, dependency2]);
   ```

### Commits Git

1. **Commits conventionnels** : Utiliser les commits conventionnels
   ```
   feat: ajouter la fonctionnalité de recherche de voitures
   fix: corriger l'affichage du prix sur mobile
   docs: mettre à jour la documentation des composants
   ```

2. **Messages descriptifs** : Les messages de commit doivent être descriptifs et mentionner les modifications apportées

### Tests

1. **Nommage des tests** : Les fichiers de tests doivent être nommés `*.test.ts` ou `*.spec.ts`
2. **Couverture de tests** : Viser une couverture de tests pour les fonctionnalités critiques
3. **Tests unitaires pour les utilitaires** : Toutes les fonctions utilitaires devraient avoir des tests unitaires
