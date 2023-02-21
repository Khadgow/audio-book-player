import { Module } from '@nestjs/common';
import { AudiobooksService } from './audiobooks.service';
import { AudiobooksController } from './audiobooks.controller';
import {PrismaService} from "prisma.service";
import {FilesModule} from "files/files.module";

@Module({
  controllers: [AudiobooksController],
  providers: [AudiobooksService, PrismaService],
  imports: [FilesModule]
})
export class AudiobooksModule {}
