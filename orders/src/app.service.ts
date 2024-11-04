import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './enum/order-status';
import { History } from './history/entities/history.entity';
import { HistoryDetailed } from './history-detailed/entities/history-detailed.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(History.name) private historyModel: Model<History>,
    @InjectModel(HistoryDetailed.name) private historyDetailedModel: Model<HistoryDetailed>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    // Step 1: Calculate the total and discount for the order
    let totalOrderAmount = 0;
    let totalOrderDiscount = 0;

    // Step 2: Validate products and accumulate totals
    for (const item of dto.cart) {
      console.log('id',item.product.id)
      const product = await this.productModel.findById(item.product.id).exec();
      console.log('product',product)
      if (!product) {
        throw new Error(`Product with ID ${item.product.id} not found`);
      }
      
      totalOrderAmount += item.total;
      totalOrderDiscount += item.discount;
    }

    // Step 3: Create the main History document
    const history = await this.historyModel.create({
      userId: dto.userId,
      total: totalOrderAmount,
      discount: totalOrderDiscount,
      status: OrderStatus.Created,  
      createdAt: new Date(),
    });

    // Step 4: Create HistoryDetailed entries for each cart item
    const historyDetails = dto.cart.map(item => ({
      history: history._id,
      product: item.product.id,
      quantity: item.quantity,
      price: item.price,
      discount: item.discount,
      total: item.total,
    }));
    
    await this.historyDetailedModel.insertMany(historyDetails);

    return { orderId: history._id, status: 'Order created successfully' };
  }
}
