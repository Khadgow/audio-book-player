import { Module } from '@nestjs/common'
import { AudioService } from './audio.service'
import { AudioController } from './audio.controller'
import { PrismaService } from 'prisma.service'
import { FilesModule } from 'files/files.module'

@Module({
  controllers: [AudioController],
  providers: [AudioService, PrismaService],
  imports: [FilesModule],
})
export class AudioModule {}
