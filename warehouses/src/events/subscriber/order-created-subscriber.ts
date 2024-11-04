// src/order/events/subscriber/order-created-subscriber.ts
import { Controller, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy, Payload, EventPattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { Product } from 'src/entities/product.entity';

@Controller()
export class OrderCreatedSubscriber {

  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}


  @EventPattern('product.created')
  async handleOrderCreated(@Payload() data: CreateProductDto) {
    const { title, description, sku, id } = data;

    try {
      // Create and save the new product
      const newProduct = new this.productModel({
        _id: id,
        title,
        description,
        sku,
      });
      await newProduct.save();

      console.log('New Product Created:', newProduct);
    } catch (error) {
      console.error('Error creating product in subscriber:', error);
    }
  }
}
