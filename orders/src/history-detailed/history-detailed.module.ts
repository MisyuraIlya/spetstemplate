import { Module } from '@nestjs/common';
import { HistoryDetailedService } from './history-detailed.service';
import { HistoryDetailedController } from './history-detailed.controller';

@Module({
  controllers: [HistoryDetailedController],
  providers: [HistoryDetailedService],
})
export class HistoryDetailedModule {}
