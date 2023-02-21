import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as path from 'path'
import * as fs from 'fs/promises'
import * as uuid from 'uuid'

@Injectable()
export class FilesService {
  async createFile(file: Express.Multer.File, dir?: string): Promise<string> {
    try {
      const extension = path.extname(file.originalname)
      const fileName = uuid.v4() + extension
      const filePath = path.resolve(__dirname, '..', 'static', dir)
      await fs.access(filePath).catch(async () => {
        await fs.mkdir(filePath, { recursive: true })
      })

      await fs.writeFile(path.join(filePath, fileName), file.buffer)

      return fileName
    } catch (error) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
