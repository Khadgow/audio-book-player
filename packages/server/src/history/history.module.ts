import { Module } from '@nestjs/common'
import { HistoryService } from './history.service'
import { HistoryController } from './history.controller'
import { PrismaService } from 'prisma.service'
import { HistoryGateway } from 'history/history.gateway'

@Module({
  controllers: [HistoryController],
  providers: [HistoryService, PrismaService, HistoryGateway],
})
export class HistoryModule {}
