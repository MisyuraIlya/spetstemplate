import { Injectable } from '@nestjs/common';
import { CreateHistoryDetailedDto } from './dto/create-history-detailed.dto';
import { UpdateHistoryDetailedDto } from './dto/update-history-detailed.dto';

@Injectable()
export class HistoryDetailedService {
  create(createHistoryDetailedDto: CreateHistoryDetailedDto) {
    return 'This action adds a new historyDetailed';
  }

  findAll() {
    return `This action returns all historyDetailed`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historyDetailed`;
  }

  update(id: number, updateHistoryDetailedDto: UpdateHistoryDetailedDto) {
    return `This action updates a #${id} historyDetailed`;
  }

  remove(id: number) {
    return `This action removes a #${id} historyDetailed`;
  }
}
