import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'prisma.service'

@WebSocketGateway({ cors: true })
export class HistoryGateway {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  @WebSocketServer()
  server

  @SubscribeMessage('history')
  async handleMessage(client: Socket, data: string) {
    const token = client.handshake.headers?.authorization?.split(' ')[1]
    if (token) {
      const user = this.jwtService.verify(token)
      if (user) {
        const historyData = JSON.parse(data)

        const record = await this.prisma.history.findFirst({
          where: {
            userId: user.id,
            audiobookId: historyData.audiobookId,
          },
        })

        if (record) {
          await this.prisma.history.update({
            where: {
              id: record.id,
            },
            data: {
              time: historyData.time,
              audioId: historyData.audioId,
              updatedAt: new Date(),
            },
          })
        } else {
          await this.prisma.history.create({
            data: {
              userId: user.id,
              audiobookId: historyData.audiobookId,
              time: historyData.time,
              audioId: historyData.audioId,
              updatedAt: new Date(),
            },
          })
        }
      } else {
        client.disconnect()
      }
    } else {
      client.disconnect()
    }
    return '123'
  }
}
