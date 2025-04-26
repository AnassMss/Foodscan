# FoodScan Pro

Application mobile-first pour scanner les codes-barres des produits alimentaires, analyser les repas via photos, et recevoir des recommandations nutritionnelles personnalisées pour les sportifs.

## Fonctionnalités principales

- Scan de codes-barres pour obtenir les informations nutritionnelles
- Analyse de repas par photo avec reconnaissance d'aliments par IA
- Suivi des repas et journal alimentaire
- Recommandations de recettes saines
- Conseils sportifs personnalisés
- Authentification sécurisée (email/mot de passe, Google, Apple)

## Stack technique

### Frontend
- Next.js 14 (App Router)
- React avec TypeScript
- TailwindCSS pour le design mobile-first
- MediaDevices API pour la capture d'images
- SWR pour la gestion des requêtes

### Backend
- Node.js avec Express
- PostgreSQL avec Prisma ORM
- Authentification JWT
- Integration OpenFoodFacts API pour les codes-barres
- Integration Google Vision API pour l'analyse d'images

## Installation

### Prérequis
- Node.js 18+ et npm
- PostgreSQL

### Configuration de l'environnement
1. Cloner le dépôt :
```bash
git clone [url-du-depot]
cd foodscan-pro
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
Copier le fichier `.env.example` en `.env` et remplir les valeurs nécessaires :
```bash
cp .env.example .env
```

4. Exécuter les migrations Prisma :
```bash
npx prisma migrate dev
```

### Lancement en développement

1. Démarrer le serveur de développement Next.js :
```bash
npm run dev
```

2. Démarrer l'API backend :
```bash
npm run dev:api
```

Le frontend sera accessible à l'adresse http://localhost:3000 et l'API à http://localhost:3001.

## Déploiement

### Frontend (Vercel)
```bash
npm run build
```

### Backend (Railway)
```bash
npm run build:api
```

## Structure du projet

```
foodscan-pro/
├── app/                  # Frontend Next.js (App Router)
├── api/                  # Backend Express
│   ├── src/
│   │   ├── controllers/  # Contrôleurs API
│   │   ├── middleware/   # Middleware Express
│   │   ├── models/       # Modèles et logique métier
│   │   ├── routes/       # Routes API
│   │   └── services/     # Services externes (OpenFoodFacts, Google Vision)
├── prisma/               # Configuration et migrations Prisma
├── public/               # Fichiers statiques
└── .env                  # Variables d'environnement
```

## Contributions

Les contributions sont les bienvenues ! Veuillez consulter le fichier CONTRIBUTING.md pour les directives.

## License

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
