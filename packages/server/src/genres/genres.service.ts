import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import {PrismaService} from "prisma.service";

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {
  }
  create(createGenreDto: CreateGenreDto) {
    return this.prisma.genre.create({data: createGenreDto});
  }

  findAll() {
    return this.prisma.genre.findMany();
  }

  findOne(id: string) {
    return this.prisma.genre.findUnique({where: {id}});
  }

  update(id: string, updateGenreDto: UpdateGenreDto) {
    return this.prisma.genre.update({data: updateGenreDto, where: {id}});
  }

  remove(id: string) {
    return this.prisma.genre.delete({where: {id}});
  }
}
