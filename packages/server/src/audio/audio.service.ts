import { Injectable } from '@nestjs/common'
import { CreateAudioDto } from './dto/create-audio.dto'
import { UpdateAudioDto } from './dto/update-audio.dto'
import { FilesService } from 'files/files.service'
import { PrismaService } from 'prisma.service'
import * as getMP3Duration from 'get-mp3-duration'

@Injectable()
export class AudioService {
  constructor(
    private fileService: FilesService,
    private prisma: PrismaService,
  ) {}
  async create(createAudioDto: CreateAudioDto, audio: Express.Multer.File) {
    const audioUrl = await this.fileService.createFile(audio, 'audioFiles')
    const duration = getMP3Duration(audio.buffer)

    return this.prisma.audio.create({
      data: { audioUrl, ...createAudioDto, duration: duration },
    })
  }

  findAll() {
    return this.prisma.audio.findMany()
  }

  findOne(id: string) {
    return this.prisma.audio.findUnique({ where: { id } })
  }

  update(id: string, updateAudioDto: UpdateAudioDto) {
    return this.prisma.audio.update({ where: { id }, data: updateAudioDto })
  }

  remove(id: string) {
    return this.prisma.audio.delete({ where: { id } })
  }
}
