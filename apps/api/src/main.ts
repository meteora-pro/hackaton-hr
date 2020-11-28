/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from './app/app.config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const appConfig = app.get(AppConfig);
  const options = new DocumentBuilder()
    .setBasePath('/' + globalPrefix)
    .setTitle('Hackaton hunt U api')
    .addServer(appConfig.appUrl)
    .addBearerAuth()
    .setDescription('Hackaton hunt U API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  // Внутренная документация будет доступно только для внутреннего использования
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
