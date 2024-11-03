// src/product/events/publisher/product-created.publisher.ts
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
@Injectable()
export class ProductPublisher {
  constructor(
    @Inject('NATS_SERVICE') private readonly client: ClientProxy,
  ) {}

  async publishCreated(event: CreateProductDto) {
    console.log('event',event)
    this.client.emit('product.created', event);
  }

  async publishUpdated(event: UpdateProductDto) {
    console.log('event',event)
    this.client.emit('product.updated', event);
  }
}
