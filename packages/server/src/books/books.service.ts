import { Injectable } from '@nestjs/common'
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'
import { FilesService } from 'files/files.service'
import { PrismaService } from 'prisma.service'

@Injectable()
export class BooksService {
  constructor(
    private fileService: FilesService,
    private prisma: PrismaService,
  ) {}
  async create(createBookDto: CreateBookDto, image: Express.Multer.File) {
    const imageUrl = await this.fileService.createFile(image, 'images')
    return this.prisma.book.create({ data: { imageUrl, ...createBookDto } })
  }

  findAll() {
    return this.prisma.book.findMany({
      include: {
        genres: true,
        author: true,
      },
    })
  }

  findOne(id: string) {
    return this.prisma.book.findUnique({
      where: { id },
      include: {
        audiobooks: {
          include: {
            voiceActor: true,
            audio: {
              orderBy: {
                position: 'asc',
              },
            },
          },
        },
        author: true,
        genres: true,
      },
    })
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.prisma.book.update({ where: { id }, data: updateBookDto })
  }

  remove(id: string) {
    return this.prisma.book.delete({ where: { id } })
  }
}
