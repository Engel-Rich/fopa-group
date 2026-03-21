import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entities/user.entity';
import { CategoryEntity } from '../entities/category.entity';
import { ProductEntity } from '../entities/product.entity';
import { CustomerEntity } from '../entities/customer.entity';
import { UserRole } from '../../../domain/entities/user.entity';
import dataSource from '../data-source';

async function runSeeds() {
  const connection = await dataSource.initialize();

  try {
    // Créer un admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = connection.manager.create(UserEntity, {
      email: 'admin@fopa.com',
      name: 'Administrateur',
      phone: '+2250100000000',
      username: 'admin',
      password: adminPassword,
      role: UserRole.ADMIN,
      isActive: true,
    });
    await connection.manager.save(admin);
    console.log('Admin créé: admin / admin123');

    // Créer une caissière
    const cashierPassword = await bcrypt.hash('caissiere123', 10);
    const cashier = connection.manager.create(UserEntity, {
      email: 'caissiere@fopa.com',
      name: 'Caissière',
      phone: '+2250100000001',
      username: 'caissiere',
      password: cashierPassword,
      role: UserRole.CAISSIERE,
      isActive: true,
    });
    await connection.manager.save(cashier);
    console.log('Caissière créée: caissiere / caissiere123');

    // Créer des catégories
    const categories = [
      { name: 'Eaux', description: 'Eaux minérales et gazeuses' },
      { name: 'Bières', description: 'Bières locales et importées' },
      { name: 'Jus', description: 'Jus de fruits' },
      { name: 'Emballages', description: 'Sacs et emballages' },
    ];

    const savedCategories: CategoryEntity[] = [];
    for (const cat of categories) {
      const category = connection.manager.create(CategoryEntity, cat);
      const saved = await connection.manager.save(category);
      savedCategories.push(saved);
      console.log(`Catégorie créée: ${cat.name}`);
    }

    // Créer des produits
    const products = [
      {
        name: 'Eau minérale 1.5L',
        categoryId: savedCategories[0].id,
        quantity: 100,
        price: 500,
        description: 'Eau minérale naturelle',
        isActive: true,
      },
      {
        name: 'Coca Cola 1.5L',
        categoryId: savedCategories[1].id,
        quantity: 50,
        price: 1500,
        description: 'Boisson gazeuse',
        isActive: true,
      },
      {
        name: 'Jus d\'orange 1L',
        categoryId: savedCategories[2].id,
        quantity: 30,
        price: 1200,
        description: 'Jus d\'orange naturel',
        isActive: true,
      },
    ];

    for (const prod of products) {
      const product = connection.manager.create(ProductEntity, prod);
      await connection.manager.save(product);
      console.log(`Produit créé: ${prod.name}`);
    }

    // Créer des clients (Users avec rôle CLIENT + Customer)
    const clientData = [
      {
        email: 'jean.dupont@example.com',
        name: 'Jean Dupont',
        phone: '+2250123456789',
        username: 'jean.dupont',
        address: 'Abidjan, Cocody',
      },
      {
        email: 'marie.kouassi@example.com',
        name: 'Marie Kouassi',
        phone: '+2250123456790',
        username: 'marie.kouassi',
        address: 'Abidjan, Yopougon',
      },
    ];

    for (const clientInfo of clientData) {
      // Créer l'utilisateur CLIENT
      const clientPassword = await bcrypt.hash('client123', 10);
      const clientUser = connection.manager.create(UserEntity, {
        email: clientInfo.email,
        name: clientInfo.name,
        phone: clientInfo.phone,
        username: clientInfo.username,
        password: clientPassword,
        role: UserRole.CLIENT,
        isActive: true,
      });
      const savedClientUser = await connection.manager.save(clientUser);

      // Créer le Customer associé
      const customer = connection.manager.create(CustomerEntity, {
        userId: savedClientUser.id,
        address: clientInfo.address,
        currentDebt: 0,
      });
      await connection.manager.save(customer);
      console.log(`Client créé: ${clientInfo.name} (User: ${clientInfo.username})`);
    }

    console.log('Seeds terminés avec succès!');
  } catch (error) {
    console.error('Erreur lors de l\'exécution des seeds:', error);
    throw error;
  } finally {
    await connection.destroy();
  }
}

runSeeds()
  .then(() => {
    console.log('Seeds exécutés avec succès');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Erreur lors de l\'exécution des seeds:', error);
    process.exit(1);
  });
