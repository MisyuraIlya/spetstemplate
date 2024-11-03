import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseProvider } from './mongoose.provider';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { NatsClientModule } from './shared/nats-client.module';

@Module({
  imports: [
    NatsClientModule,
    MongooseProvider,
    CategoryModule,
    ProductModule,
    BrandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
