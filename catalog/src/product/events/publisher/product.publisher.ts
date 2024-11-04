import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class ProductPublisher {
  constructor(
    @Inject('NATS_SERVICE') private readonly client: ClientProxy,
  ) {}

  async publishCreated(event: Product) {
    console.log('created',event)
    this.client.emit('product.created', event);
  }

  async publishUpdated(event: UpdateProductDto) {
    console.log('updated',event)
    this.client.emit('product.updated', event);
  }

  async publishRemoved(event: {id:string}) {
    console.log('removed',event)
    this.client.emit('product.removed', event);
  }
}
