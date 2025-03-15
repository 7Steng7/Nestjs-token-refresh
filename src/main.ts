import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API NestJS-token-refresh')
    .setDescription('Este proyecto es una API REST desarrollada con NestJS y Node.js, utilizando MongoDB como base de datos. Implementa un sistema de autenticación con JWT, gestión de usuarios y recuperación de contraseña mediante correo electrónico.')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  await app.listen(3000);
}
bootstrap();