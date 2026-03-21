# FOPA SOP - Point of Sale System

Application POS (Point of Sale) complète pour un dépôt de boissons utilisant NestJS avec TypeScript, suivant les principes de Clean Architecture.

## Architecture

L'application suit une architecture Clean Architecture avec les couches suivantes:

```
src/
├── application/          # Couche application (use cases, DTOs)
├── domain/              # Couche domaine (entités, interfaces repositories)
├── infrastructure/      # Couche infrastructure (repositories, config, services)
├── presentation/         # Couche présentation (controllers, guards, decorators)
└── shared/              # Code partagé (exceptions, utils)
```

## Technologies

- **Framework**: NestJS 11
- **ORM**: TypeORM
- **Base de données**: PostgreSQL
- **Authentification**: JWT avec Passport
- **Validation**: class-validator et class-transformer
- **Documentation**: Swagger/OpenAPI

## Installation

### Prérequis

- Node.js (v18 ou supérieur)
- PostgreSQL (v15 ou supérieur)
- npm ou yarn

### Étapes d'installation

1. **Cloner le projet** (si applicable)

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

Éditez le fichier `.env` et configurez:
- Les paramètres de la base de données
- Le secret JWT
- Le port de l'application

4. **Créer la base de données**
```bash
createdb fopa_sop
```

5. **Exécuter les migrations**
```bash
npm run migration:run
```

6. **Exécuter les seeds (données de test)**
```bash
npm run seed
```

## Démarrage

### Mode développement
```bash
npm run start:dev
```

### Mode production
```bash
npm run build
npm run start:prod
```

L'application sera accessible sur `http://localhost:3000`

## Documentation API

Une fois l'application démarrée, accédez à la documentation Swagger:
- **Interface Swagger**: http://localhost:3000/api
- **JSON Swagger**: http://localhost:3000/api-json

## Comptes de test

Après avoir exécuté les seeds, vous pouvez vous connecter avec:

### Administrateur
- **Username**: `admin`
- **Password**: `admin123`

### Caissière
- **Username**: `caissiere`
- **Password**: `caissiere123`

## Structure des modules

### Auth
- `POST /auth/login` - Connexion
- `POST /auth/register` - Créer un utilisateur (Admin uniquement)

### Users
- `GET /users` - Liste des utilisateurs
- `POST /users` - Créer un utilisateur
- `PUT /users/:id` - Mettre à jour un utilisateur
- `DELETE /users/:id` - Supprimer un utilisateur

### Categories
- `GET /categories` - Liste des catégories
- `POST /categories` - Créer une catégorie

### Products
- `GET /products` - Liste des produits
- `POST /products` - Créer un produit
- `PUT /products/:id` - Mettre à jour un produit

### Stock
- `POST /stock/entry` - Entrée de stock
- `POST /stock/exit` - Sortie de stock

### Customers
- `GET /customers` - Liste des clients
- `POST /customers` - Créer un client

### Orders
- `POST /orders` - Créer une commande
- `GET /orders/:id` - Détails d'une commande
- `POST /orders/:id/payments` - Ajouter un paiement

### Reports
- `GET /reports/daily?date=2024-01-15` - Ventes quotidiennes
- `GET /reports/monthly?month=1&year=2024` - Ventes mensuelles
- `GET /reports/yearly?year=2024` - Ventes annuelles

## Scripts disponibles

- `npm run start:dev` - Démarrer en mode développement
- `npm run build` - Compiler le projet
- `npm run start:prod` - Démarrer en mode production
- `npm run migration:generate` - Générer une migration
- `npm run migration:run` - Exécuter les migrations
- `npm run migration:revert` - Annuler la dernière migration
- `npm run seed` - Exécuter les seeds
- `npm run lint` - Linter le code
- `npm run test` - Exécuter les tests

## Rôles et permissions

- **ADMIN**: Accès complet à toutes les fonctionnalités
- **CAISSIERE**: Peut créer des commandes, gérer les clients, voir les rapports
- **CLIENT**: Ne peut pas se connecter (géré par ADMIN/CAISSIERE)

## Gestion des stocks

- Les **ENTREES** de stock sont créées par l'ADMIN
- Les **SORTIES** de stock nécessitent un motif
- Les **VENTES** sont créées automatiquement lors de la validation d'une commande

## Gestion des commandes

### Création d'une commande
1. Récupération automatique de la dette actuelle du client
2. Calcul du subtotal (somme des articles)
3. Calcul du totalAmount (subtotal + previousDebt)
4. Création des mouvements de stock (type: VENTE)
5. Mise à jour automatique du stock des produits

### Paiements multiples
- Un client peut payer en plusieurs tranches
- Chaque paiement met à jour `amountPaid` et `remainingDebt`
- Le statut est mis à jour automatiquement (PENDING → PARTIALLY_PAID → PAID)

### Gestion de la dette
- Un client ne peut avoir qu'une seule dette active
- La dette du client = `remainingDebt` de sa dernière commande non soldée
- Quand une commande est soldée (PAID), `currentDebt` = 0
- La prochaine commande récupère automatiquement `currentDebt` comme `previousDebt`

## Exemple de flow : Création d'une Commande

```
1. Client arrive avec une dette de 5000 FCFA
2. Il achète : 2 bières (1000 FCFA × 2) + 1 eau (500 FCFA)
3. Subtotal = 2500 FCFA
4. TotalAmount = 2500 + 5000 (previousDebt) = 7500 FCFA
5. Il paie 3000 FCFA
6. RemainingDebt = 7500 - 3000 = 4500 FCFA
7. Status = PARTIALLY_PAID
8. Customer.currentDebt = 4500 FCFA
9. Stock mis à jour : -2 bières, -1 eau
10. StockMovements créés (type: VENTE)
```

## Sécurité

- Hash des mots de passe avec bcrypt (rounds: 10)
- Validation stricte des DTOs
- Protection CORS configurable
- Authentification JWT obligatoire (sauf endpoints publics)
- Vérification des rôles avec guards

## Gestion des erreurs

- Exceptions personnalisées dans `shared/exceptions`
- Global exception filter pour une gestion centralisée
- Messages d'erreur en français

## Logging

- Logger NestJS pour toutes les opérations importantes
- Logs des mouvements de stock
- Logs des paiements

## Développement

### Structure du code

- **Code en anglais**: variables, fonctions, classes
- **Messages d'erreur en français**
- **Commentaires en français** pour la logique métier complexe
- **Respect des principes SOLID**
- **Dependency Injection** systématique
- **Async/Await** pour toutes les opérations asynchrones
- **TypeScript strict mode** activé

## Support

Pour toute question ou problème, veuillez créer une issue dans le dépôt du projet.

## Licence

UNLICENSED
