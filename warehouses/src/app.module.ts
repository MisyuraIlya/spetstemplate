import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WarehouseModule } from './warehouse/warehouse.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [WarehouseModule, StockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
