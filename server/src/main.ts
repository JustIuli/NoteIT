import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Note it')
    .setDescription('A note taking app , simple but effective!')
    .setVersion('1.0.0')
    .addTag('Note taking')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // compodoc would have been a much better tool for documenting this app

  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 600,
  });

  await app.listen(3000);
}

bootstrap();
