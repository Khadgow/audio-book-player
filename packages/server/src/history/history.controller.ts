import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Headers,
} from '@nestjs/common'
import { HistoryService } from './history.service'
import { CreateHistoryDto } from './dto/create-history.dto'
import { UpdateHistoryDto } from './dto/update-history.dto'

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(createHistoryDto)
  }

  @Get()
  findAll(@Headers() headers) {
    return this.historyService.findAll(headers.authorization)
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.historyService.findOne(id)
  // }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historyService.update(id, updateHistoryDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyService.remove(id)
  }

  @Get('/last')
  finLast(@Headers() headers) {
    return this.historyService.findLast(headers.authorization)
  }
}
