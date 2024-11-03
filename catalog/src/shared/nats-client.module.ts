// src/shared/nats-client.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_URL],
          timeout: 5000,
          reconnectAttempts: 5,
          reconnectTimeWait: 1000,
          waitOnFirstConnect: true,
        },
      },
    ]),
  ],
  exports: [ClientsModule], 
})
export class NatsClientModule {}
