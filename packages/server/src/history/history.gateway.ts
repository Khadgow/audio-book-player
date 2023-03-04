import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'

@WebSocketGateway({ cors: true })
export class HistoryGateway {
  @WebSocketServer()
  server

  @SubscribeMessage('history')
  handleMessage(client: any, data: string) {
    console.log('client', client)
    console.log('data', data)
    return '123'
  }
}
