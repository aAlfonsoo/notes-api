import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  // console.log('MONGO_URI:', process.env.MONGO_URI);

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
