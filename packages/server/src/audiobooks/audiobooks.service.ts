import { Injectable } from '@nestjs/common'
import { CreateAudiobookDto } from './dto/create-audiobook.dto'
import { UpdateAudiobookDto } from './dto/update-audiobook.dto'
import { FilesService } from 'files/files.service'
import { PrismaService } from 'prisma.service'
import { AudioService } from 'audio/audio.service'
import * as getMP3Duration from 'get-mp3-duration'

@Injectable()
export class AudiobooksService {
  constructor(
    private fileService: FilesService,
    private prisma: PrismaService,
    private audioService: AudioService,
  ) {}

  async create(
    createAudiobookDto: CreateAudiobookDto,
    files: Array<Express.Multer.File>,
  ) {
    const newAudiobook = await this.prisma.audiobook.create({
      data: { ...createAudiobookDto },
    })

    files.forEach((file, index) => {
      this.audioService.create(
        {
          name: file.fieldname,
          audiobookId: newAudiobook.id,
          position: index,
        },
        file,
      )
    })

    return newAudiobook
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
