import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('FOPA SOP - Point of Sale API')
    .setDescription('API complète pour la gestion d\'un dépôt de boissons')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Entrez le token JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Auth', 'Authentification et autorisation')
    .addTag('Users', 'Gestion des utilisateurs')
    .addTag('Categories', 'Gestion des catégories')
    .addTag('Products', 'Gestion des produits')
    .addTag('Stock', 'Gestion des stocks')
    .addTag('Customers', 'Gestion des clients')
    .addTag('Orders', 'Gestion des commandes')
    .addTag('Reports', 'Rapports et statistiques')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  SwaggerModule.setup('api-json', app, document, {
    jsonDocumentUrl: 'api-json',
  });
};
