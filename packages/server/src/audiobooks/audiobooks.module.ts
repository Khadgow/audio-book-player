import { Module } from '@nestjs/common'
import { AudiobooksService } from './audiobooks.service'
import { AudiobooksController } from './audiobooks.controller'
import { PrismaService } from 'prisma.service'
import { FilesModule } from 'files/files.module'
import { AudioService } from 'audio/audio.service'

@Module({
  controllers: [AudiobooksController],
  providers: [AudiobooksService, PrismaService, AudioService],
  imports: [FilesModule],
})
export class AudiobooksModule {}
