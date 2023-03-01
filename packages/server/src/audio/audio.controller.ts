import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { AudioService } from './audio.service'
import { CreateAudioDto } from './dto/create-audio.dto'
import { UpdateAudioDto } from './dto/update-audio.dto'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post()
  @UseInterceptors(FileInterceptor('audio'))
  create(
    @UploadedFile() audio: Express.Multer.File,
    @Body() createAudioDto: CreateAudioDto,
  ) {
    return this.audioService.create(createAudioDto, audio)
  }

  @Get()
  findAll() {
    return this.audioService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audioService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAudioDto: UpdateAudioDto) {
    return this.audioService.update(id, updateAudioDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.audioService.remove(id)
  }
}
