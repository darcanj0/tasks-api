import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('tasks-api')
    .setVersion('1.0.0')
    .setDescription('Api for personal tasks management')
    .addTag('auth')
    .addTag('tasks')
    .addTag('tags')
    .addTag('status')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
