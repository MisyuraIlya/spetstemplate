import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseProvider } from './mongoose.provider';
import { OrderCreatedSubscriber } from './events/subscriber/order-created-subscriber';
import { NatsClientModule } from './shared/nats-client.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { HistoryModule } from './history/history.module';
import { HistoryDetailedModule } from './history-detailed/history-detailed.module';
import { HistoryDetailed, HistoryDetailedSchema } from './history-detailed/entities/history-detailed.entity';
import { History, HistorySchema} from './history/entities/history.entity';

@Module({
  imports: [
    NatsClientModule,
    MongooseProvider,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: History.name, schema: HistorySchema },
      { name: HistoryDetailed.name, schema: HistoryDetailedSchema },
    ]),
    HistoryModule,
    HistoryDetailedModule,
  ],
  controllers: [AppController,OrderCreatedSubscriber],
  providers: [AppService],
})
export class AppModule {}
