import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './infrastructure/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration globale de validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configuration CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Configuration Swagger
  setupSwagger(app);

  const port = process.env.PORT || 3000;
  await app.listen(3000);

  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api`);
  console.log(`Swagger JSON: http://localhost:${port}/api-json`);
}

bootstrap();
