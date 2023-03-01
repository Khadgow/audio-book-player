import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { VoiceActorsService } from './voice-actors.service'
import { CreateVoiceActorDto } from './dto/create-voice-actor.dto'
import { UpdateVoiceActorDto } from './dto/update-voice-actor.dto'

@Controller('voice-actors')
export class VoiceActorsController {
  constructor(private readonly voiceActorsService: VoiceActorsService) {}

  @Post()
  create(@Body() createVoiceActorDto: CreateVoiceActorDto) {
    return this.voiceActorsService.create(createVoiceActorDto)
  }

  @Get()
  findAll() {
    return this.voiceActorsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voiceActorsService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateVoiceActorDto: UpdateVoiceActorDto,
  ) {
    return this.voiceActorsService.update(id, updateVoiceActorDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voiceActorsService.remove(id)
  }
}
