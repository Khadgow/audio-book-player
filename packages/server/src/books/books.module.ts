import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import {PrismaService} from "prisma.service";
import {FilesModule} from "files/files.module";

@Module({
  controllers: [BooksController],
  providers: [BooksService, PrismaService],
  imports: [FilesModule]
})
export class BooksModule {}
