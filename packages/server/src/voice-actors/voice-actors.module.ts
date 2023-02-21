import { Module } from '@nestjs/common';
import { VoiceActorsService } from './voice-actors.service';
import { VoiceActorsController } from './voice-actors.controller';
import {PrismaService} from "prisma.service";

@Module({
  controllers: [VoiceActorsController],
  providers: [VoiceActorsService, PrismaService]
})
export class VoiceActorsModule {}
