import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const nats = process.env.NATS_URL 
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [nats],
      timeout: 5000,
      reconnectAttempts: 5,
      reconnectTimeWait: 1000,
      waitOnFirstConnect: true, 
    },
  });

  await app.startAllMicroservices();
  console.log('Microservice connected via NATS is running!');

  await app.listen(3000);
  console.log('CONSUMER SERVICE IS RUNNING');

}
bootstrap();
