import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import {PrismaService} from "prisma.service";

@Injectable()
export class AuthorsService {

  constructor(private prisma: PrismaService) {
  }
  create(createAuthorDto: CreateAuthorDto) {
    return this.prisma.author.create({data: createAuthorDto});
  }

  findAll() {
    return this.prisma.author.findMany();
  }

  findOne(id: string) {
    return this.prisma.author.findUnique({where: {id}});
  }

  update(id: string, updateAuthorDto: UpdateAuthorDto) {
    return this.prisma.author.update({data: updateAuthorDto, where: {id}});
  }

  remove(id: string) {
    return this.prisma.author.delete({where: {id}});
  }
}
