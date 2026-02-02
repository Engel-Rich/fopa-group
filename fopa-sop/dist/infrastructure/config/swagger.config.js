"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const setupSwagger = (app) => {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('FOPA SOP - Point of Sale API')
        .setDescription('API complète pour la gestion d\'un dépôt de boissons')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Entrez le token JWT',
        in: 'header',
    }, 'JWT-auth')
        .addTag('Auth', 'Authentification et autorisation')
        .addTag('Users', 'Gestion des utilisateurs')
        .addTag('Categories', 'Gestion des catégories')
        .addTag('Products', 'Gestion des produits')
        .addTag('Stock', 'Gestion des stocks')
        .addTag('Customers', 'Gestion des clients')
        .addTag('Orders', 'Gestion des commandes')
        .addTag('Reports', 'Rapports et statistiques')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    swagger_1.SwaggerModule.setup('api-json', app, document, {
        jsonDocumentUrl: 'api-json',
    });
};
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.config.js.map