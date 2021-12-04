import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from 'config/environment';
import { AllExceptionsFilter } from 'middlewares/all-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter()); // handler exceptions
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
