import { Injectable } from '@nestjs/common'
import { CreateHistoryDto } from './dto/create-history.dto'
import { UpdateHistoryDto } from './dto/update-history.dto'
import { PrismaService } from 'prisma.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  create(createHistoryDto: CreateHistoryDto) {
    return this.prisma.history.create({ data: createHistoryDto })
  }

  findAll(header: string) {
    const token = header.split(' ')[1]
    const user = this.jwtService.verify(token)

    return this.prisma.history.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      include: {
        audio: true,
        audiobook: {
          include: {
            voiceActor: true,
            audio: true,
            book: {
              include: {
                author: true,
              },
            },
          },
        },
      },
    })
  }

  findOne(id: string) {
    return this.prisma.history.findUnique({ where: { id } })
  }

  update(id: string, updateHistoryDto: UpdateHistoryDto) {
    return this.prisma.history.update({ where: { id }, data: updateHistoryDto })
  }

  remove(id: string) {
    return this.prisma.history.delete({ where: { id } })
  }

  findLast(header: string) {
    const token = header.split(' ')[1]
    const user = this.jwtService.verify(token)

    return this.prisma.history.findFirst({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      include: {
        audio: true,
        audiobook: {
          include: {
            audio: true,
            voiceActor: true,
            book: {
              include: {
                author: true,
              },
            },
          },
        },
      },
    })
  }
}
