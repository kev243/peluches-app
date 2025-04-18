# 🧸 Calinou - Shopify Peluche Gift System

Ce projet est une application permettant de gérer des commandes et des cadeaux pour une boutique en ligne de peluches. Une intégration Shopify avec logique de fidélisation client : à chaque 5ᵉ commande, le client reçoit un e-mail contenant un lien pour choisir une peluche gratuite. Il utilise **Next.js**, **Prisma**, et **Inngest** pour gérer les webhooks, les bases de données, et les flux d'événements.

![Capture d'écran 1](img/cap1.png)

## Fonctionnalités

- Détection de première commande (e-mail personnalisé)
- Compteur de commandes par client
- Envoi d’un lien cadeau à la 5ᵉ commande avec **Resend**.
- Lien cadeau sécurisé avec token unique
- Sélection de la peluche depuis Shopify (Storefront API)
- Création automatique de la commande cadeau
- Validation des adresses avec **Zod**.
- API pour récupérer les produits Shopify.
- Webhooks Shopify via [Inngest](https://www.inngest.com/)
- Envois d’e-mails via [Resend](https://resend.com/)

> Après avoir sélectionné sa peluche cadeau, le client remplit ce formulaire avec ses informations de livraison. Chaque champ est validé avec **Zod** pour garantir la qualité des données.

![Capture d'écran 2](img/cap2.png)

> Cet e-mail est automatiquement envoyé lorsqu'un client passe sa toute première commande. Il contient un message de bienvenue personnalisé pour renforcer la relation avec le client dès le départ.

![Email de première commande](img/cap4.png)

> Lorsqu’un client atteint sa 5ᵉ commande, un e-mail de félicitations lui est envoyé avec un lien sécurisé lui permettant de choisir une peluche gratuite comme cadeau de fidélité.

![Email cadeau débloqué](img/cap3.png)

## 🛠️ Technologies utilisées

- **Next.js** (v15.2.5) : Framework React pour le rendu côté serveur et les API routes.
- **Prisma** (v6.6.0) : ORM pour interagir avec la base de données PostgreSQL avec NEON.
- **Inngest** (v3.34.4) : Gestion des flux d'événements.
- **Nextjs** (v15.2.5) : Bibliothèque pour construire l'interface utilisateur.
- **Zod** (v3.24.2) : Validation des schémas de données.
- **Resend** (v4.2.0) : Envoi d'e-mails transactionnels.
- **TailwindCSS** : Framework CSS pour le style.
- **Vercel** : Pour l'hébergement de notre application

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

4. Configurez la base de données avec Prisma :

```bash
npx prisma migrate dev --name init

```

5. Lancez le serveur de développement :

```bash
npm run dev

```

Si vous avez des questions, des suggestions ou si vous souhaitez collaborer, n’hésitez pas à me contacter :

📧 Email : k.nimi73@gmail.com
