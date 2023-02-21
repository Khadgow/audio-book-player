import { Injectable } from '@nestjs/common';
import { CreateVoiceActorDto } from './dto/create-voice-actor.dto';
import { UpdateVoiceActorDto } from './dto/update-voice-actor.dto';
import {PrismaService} from "prisma.service";

@Injectable()
export class VoiceActorsService {

  constructor(private prisma: PrismaService) {
  }
  create(createVoiceActorDto: CreateVoiceActorDto) {
    return this.prisma.voiceActor.create({data: createVoiceActorDto})
  }

  findAll() {
    return this.prisma.voiceActor.findMany()
  }

  findOne(id: string) {
    return this.prisma.voiceActor.findUnique({where: {id}})
  }

  update(id: string, updateVoiceActorDto: UpdateVoiceActorDto) {
    return this.prisma.voiceActor.update({data: updateVoiceActorDto, where: {id}})
  }

  remove(id: string) {
    return this.prisma.voiceActor.delete({where: {id}})
  }
}
