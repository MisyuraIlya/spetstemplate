import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('api/orders')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('createOrder')
  createOrder(@Body() createDto: CreateOrderDto) {
    return this.appService.createOrder(createDto);
  }
  
}
