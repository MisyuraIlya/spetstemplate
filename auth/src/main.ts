import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://myapp.local',
    credentials: true, 
  });

  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
