import { Injectable } from '@nestjs/common'
import { CreateAudiobookDto } from './dto/create-audiobook.dto'
import { UpdateAudiobookDto } from './dto/update-audiobook.dto'
import { FilesService } from 'files/files.service'
import { PrismaService } from 'prisma.service'

@Injectable()
export class AudiobooksService {
  constructor(
    private fileService: FilesService,
    private prisma: PrismaService,
  ) {}

  async create(
    createAudiobookDto: CreateAudiobookDto,
    audio: Express.Multer.File,
  ) {
    const audioUrl = await this.fileService.createFile(audio, 'audio')
    return this.prisma.audiobook.create({
      data: { audioUrl, ...createAudiobookDto },
    })
  }

  findAll() {
    return this.prisma.audiobook.findMany()
  }

  findOne(id: string) {
    return this.prisma.audiobook.findUnique({ where: { id } })
  }

  update(id: string, updateAudiobookDto: UpdateAudiobookDto) {
    return this.prisma.audiobook.update({
      where: { id },
      data: updateAudiobookDto,
    })
  }

  remove(id: string) {
    return this.prisma.audiobook.delete({ where: { id } })
  }
}
