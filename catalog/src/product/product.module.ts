import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { NatsClientModule } from 'src/shared/nats-client.module';
import { ProductPublisher } from './events/publisher/product.publisher';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    NatsClientModule
  ],
  controllers: [ProductController],
  providers: [ProductService,ProductPublisher],
})
export class ProductModule {}
