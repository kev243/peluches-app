# Peluche Backend

Ce projet est le backend d'une application permettant de gérer des commandes et des cadeaux pour une boutique en ligne de peluches. Il utilise **Next.js**, **Prisma**, et **Inngest** pour gérer les webhooks, les bases de données, et les flux d'événements.

## 🚀 Fonctionnalités

- Gestion des commandes Shopify via des webhooks.
- Génération et gestion de tokens pour les cadeaux.
- Validation des adresses avec **Zod**.
- Envoi d'e-mails de confirmation avec **Resend**.
- API pour récupérer les produits Shopify.

## 🛠️ Technologies utilisées

- **Next.js** (v15.2.5) : Framework React pour le rendu côté serveur et les API routes.
- **Prisma** (v6.6.0) : ORM pour interagir avec la base de données PostgreSQL avec NEON.
- **Inngest** (v3.34.4) : Gestion des flux d'événements.
- **React** (v19.0.0) : Bibliothèque pour construire l'interface utilisateur.
- **Zod** (v3.24.2) : Validation des schémas de données.
- **Resend** (v4.2.0) : Envoi d'e-mails transactionnels.
- **TailwindCSS** : Framework CSS pour le style.

## ⚙️ Installation

### Prérequis

- Node.js (v18 ou supérieur)
- PostgreSQL
- Un compte Shopify avec un token d'accès Storefront
- Un compte Resend pour l'envoi d'e-mails

### Étapes

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/votre-utilisateur/peluche-backend.git
   cd peluche-backend

   ```

2. Installez les dépendances :

```bash
npm install
```

3. Configurez les variables d'environnement : Créez un fichier .env à la racine du projet et ajoutez les variables suivantes :

   ```bash
   DATABASE_URL=postgresql://user:password@localhost:5432/peluche
   SHOPIFY_STORE_DOMAIN=votre-boutique.myshopify.com
   SHOPIFY_STOREFRONT_TOKEN=votre-token-storefront
   SHOPIFY_WEBHOOK_SECRET=votre-secret-webhook
   RESEND_API_KEY=votre-api-key-resend
   ```

````


4. Configurez la base de données avec Prisma :

```bash
npx prisma migrate dev --name init
````

5. Lancez le serveur de développement :

```bash
   npm run dev

```
