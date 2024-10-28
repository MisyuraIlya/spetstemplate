import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseProvider } from './mongoose.provider';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_URL ],
          timeout: 5000,
          reconnectAttempts: 5,
          reconnectTimeWait: 1000,
          waitOnFirstConnect: true, 
        }
      },
    ]),
    MongooseProvider,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
