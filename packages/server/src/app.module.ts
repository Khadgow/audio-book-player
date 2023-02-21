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
      rootPath: path.resolve(__dirname, 'static'),
    }),
  ],
  providers: [PrismaService],
})
export class AppModule {}
