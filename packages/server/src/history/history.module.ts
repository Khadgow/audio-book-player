import { Module } from '@nestjs/common'
import { HistoryService } from './history.service'
import { HistoryController } from './history.controller'
import { PrismaService } from 'prisma.service'
import { HistoryGateway } from 'history/history.gateway'
import { AuthModule } from 'auth/auth.module'

@Module({
  controllers: [HistoryController],
  providers: [HistoryService, PrismaService, HistoryGateway],
  imports: [AuthModule],
})
export class HistoryModule {}
