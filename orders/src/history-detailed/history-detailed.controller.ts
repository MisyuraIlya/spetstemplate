import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoryDetailedService } from './history-detailed.service';
import { CreateHistoryDetailedDto } from './dto/create-history-detailed.dto';
import { UpdateHistoryDetailedDto } from './dto/update-history-detailed.dto';

@Controller('history-detailed')
export class HistoryDetailedController {
  constructor(private readonly historyDetailedService: HistoryDetailedService) {}

  @Post()
  create(@Body() createHistoryDetailedDto: CreateHistoryDetailedDto) {
    return this.historyDetailedService.create(createHistoryDetailedDto);
  }

  @Get()
  findAll() {
    return this.historyDetailedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyDetailedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryDetailedDto: UpdateHistoryDetailedDto) {
    return this.historyDetailedService.update(+id, updateHistoryDetailedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyDetailedService.remove(+id);
  }
}
