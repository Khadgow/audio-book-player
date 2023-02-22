import { Module } from '@nestjs/common'
import { RolesModule } from 'roles/roles.module'
import { UsersModule } from 'users/users.module'
import { PrismaService } from 'prisma.service'
import { AuthorsModule } from 'authors/authors.module'
import { VoiceActorsModule } from 'voice-actors/voice-actors.module'
import { AudiobooksModule } from 'audiobooks/audiobooks.module'
import { GenresModule } from 'genres/genres.module'
import { HistoryModule } from 'history/history.module'
import { BooksModule } from 'books/books.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import * as process from 'process'

@Module({
  imports: [
    UsersModule,
    RolesModule,
    AuthorsModule,
    VoiceActorsModule,
    AudiobooksModule,
    GenresModule,
    HistoryModule,
    BooksModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(process.env.FILE_STORAGE_PATH, 'static'), // __dirname
    }),
  ],
  providers: [PrismaService],
})
export class AppModule {}
