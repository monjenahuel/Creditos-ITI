import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MigrationService } from './migration/migration.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, // Elimina los campos que no esten en el DTO
    transform: true  // Convierte los tipos de datos a los especificados en el DTO
  }));
  app.enableCors();
  app.setGlobalPrefix('api');

  const seedService = app.get(MigrationService);
  await seedService.seed(); 

  await app.listen(3000);
}
bootstrap();
