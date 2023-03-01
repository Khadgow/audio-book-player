import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  Put,
  UploadedFiles,
} from '@nestjs/common'
import { AudiobooksService } from './audiobooks.service'
import { CreateAudiobookDto } from './dto/create-audiobook.dto'
import { UpdateAudiobookDto } from './dto/update-audiobook.dto'
import { AnyFilesInterceptor } from '@nestjs/platform-express'

@Controller('audiobooks')
export class AudiobooksController {
  constructor(private readonly audiobooksService: AudiobooksService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createAudiobookDto: CreateAudiobookDto,
  ) {
    return this.audiobooksService.create(createAudiobookDto, files)
  }

  @Get()
  findAll() {
    return this.audiobooksService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audiobooksService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAudiobookDto: UpdateAudiobookDto,
  ) {
    return this.audiobooksService.update(id, updateAudiobookDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.audiobooksService.remove(id)
  }
}
