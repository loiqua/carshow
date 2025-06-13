# Car Show

![Next.js](https://img.shields.io/badge/Next.js-15.1.8-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Prisma](https://img.shields.io/badge/Prisma-Latest-green) ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Latest-purple)

## 📋 Vue d'ensemble

Car Show est une application web de présentation de voitures premium permettant aux utilisateurs de découvrir, rechercher et prendre rendez-vous pour essayer des véhicules de luxe. L'application dispose également d'un dashboard administratif pour la gestion du contenu.

## ✨ Fonctionnalités

### Front Office
- Landing Page avec mise en avant des marques et véhicules premium
- Recherche avancée de véhicules avec filtres
- Fiches détaillées des véhicules
- Système de prise de rendez-vous pour essais

### Dashboard Administratif
- Gestion des utilisateurs (CRUD)
- Gestion des véhicules (CRUD)
- Gestion des images (CRUD)
- Gestion des rendez-vous

## 🛠️ Stack Technique

- **Frontend** : Next.js 15 avec TypeScript
- **UI/UX** : shadcn UI pour des composants modernes et accessibles
- **Base de données** : PostgreSQL via Prisma ORM
- **Authentification** : NextAuth.js
- **Formulaires** : React Hook Form avec validation Zod
- **Administration** : React Admin

## 🗄️ Structure de la Base de Données

- **Car** : informations des véhicules (nom, description, marque, modèle, prix, etc.)
- **Image** : images liées aux véhicules
- **Appointment** : rendez-vous pour essayer les véhicules
- **User** : utilisateurs administrateurs

## 🚀 Installation

### Prérequis
- Node.js 18.0 ou supérieur
- npm ou yarn

### Étapes d'installation

1. Cloner le dépôt
   ```bash
   git clone https://github.com/loiqua/car-show.git
   cd car-show
   ```

2. Installer les dépendances
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configurer les variables d'environnement
   ```bash
   cp .env.example .env.local
   # Puis modifiez les variables dans .env.local
   ```

4. Lancer le serveur de développement
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

## 📦 Structure du Projet

```
/
├── app/                    # Routes Next.js App Router
├── components/             # Composants React réutilisables
│   ├── sections/           # Sections de page (héro, marques, etc.)
│   └── ui/                 # Composants UI de base (boutons, cards, etc.)
├── lib/                    # Utilitaires et configurations
├── prisma/                 # Schéma et migrations Prisma
├── providers/              # Providers React (thème, auth, etc.)
└── public/                 # Fichiers statiques
```

## 🧪 Tests

Lancer les tests avec la commande :

```bash
npm test
# ou
yarn test
```

## 📝 Méthodologie de Développement

Le projet suit une approche méthodique :
1. Développement avec code propre
2. Tests des fonctionnalités
3. Vérification du bon fonctionnement
4. Commits conventionnels pour chaque fonctionnalité

# deploy
## 🔐 Licence

Ce projet est sous licence privée. Tous droits réservés.
