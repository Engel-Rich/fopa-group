"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const user_entity_1 = require("../entities/user.entity");
const category_entity_1 = require("../entities/category.entity");
const product_entity_1 = require("../entities/product.entity");
const customer_entity_1 = require("../entities/customer.entity");
const user_entity_2 = require("../../../domain/entities/user.entity");
const data_source_1 = __importDefault(require("../data-source"));
async function runSeeds() {
    const connection = await data_source_1.default.initialize();
    try {
        const adminPassword = await bcrypt.hash('admin123', 10);
        const admin = connection.manager.create(user_entity_1.UserEntity, {
            email: 'admin@fopa.com',
            name: 'Administrateur',
            phone: '+2250100000000',
            username: 'admin',
            password: adminPassword,
            role: user_entity_2.UserRole.ADMIN,
            isActive: true,
        });
        await connection.manager.save(admin);
        console.log('Admin créé: admin / admin123');
        const cashierPassword = await bcrypt.hash('caissiere123', 10);
        const cashier = connection.manager.create(user_entity_1.UserEntity, {
            email: 'caissiere@fopa.com',
            name: 'Caissière',
            phone: '+2250100000001',
            username: 'caissiere',
            password: cashierPassword,
            role: user_entity_2.UserRole.CAISSIERE,
            isActive: true,
        });
        await connection.manager.save(cashier);
        console.log('Caissière créée: caissiere / caissiere123');
        const categories = [
            { name: 'Eaux', description: 'Eaux minérales et gazeuses' },
            { name: 'Bières', description: 'Bières locales et importées' },
            { name: 'Jus', description: 'Jus de fruits' },
            { name: 'Emballages', description: 'Sacs et emballages' },
        ];
        const savedCategories = [];
        for (const cat of categories) {
            const category = connection.manager.create(category_entity_1.CategoryEntity, cat);
            const saved = await connection.manager.save(category);
            savedCategories.push(saved);
            console.log(`Catégorie créée: ${cat.name}`);
        }
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
            const product = connection.manager.create(product_entity_1.ProductEntity, prod);
            await connection.manager.save(product);
            console.log(`Produit créé: ${prod.name}`);
        }
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
            const clientPassword = await bcrypt.hash('client123', 10);
            const clientUser = connection.manager.create(user_entity_1.UserEntity, {
                email: clientInfo.email,
                name: clientInfo.name,
                phone: clientInfo.phone,
                username: clientInfo.username,
                password: clientPassword,
                role: user_entity_2.UserRole.CLIENT,
                isActive: true,
            });
            const savedClientUser = await connection.manager.save(clientUser);
            const customer = connection.manager.create(customer_entity_1.CustomerEntity, {
                userId: savedClientUser.id,
                address: clientInfo.address,
                currentDebt: 0,
            });
            await connection.manager.save(customer);
            console.log(`Client créé: ${clientInfo.name} (User: ${clientInfo.username})`);
        }
        console.log('Seeds terminés avec succès!');
    }
    catch (error) {
        console.error('Erreur lors de l\'exécution des seeds:', error);
        throw error;
    }
    finally {
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
//# sourceMappingURL=run-seeds.js.map