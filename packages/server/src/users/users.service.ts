import { CreateUserDto } from './dto/create-user.dto'
import { RolesService } from 'roles/roles.service'
import { AddRoleDto } from './dto/add-role.dto'
import { HttpException, HttpStatus } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'prisma.service'
import { Injectable } from '@nestjs/common'
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private roleService: RolesService,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const role = await this.roleService.getRoleByName('USER')
    const user = await this.prisma.user.create({
      data: dto,
    })
    this.prisma.userRole.create({
      data: { user_id: user.id, role_id: role.id },
    })
    return user
  }

  async getMe(token: string) {
    const { email, id, roles, username } = this.jwtService.verify(
      token.split(' ')[1],
    )
    return { email, id, roles, username }
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        roles: {
          select: { role: true },
        },
      },
    })
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { roles: true },
    })
  }

  async getUserById(id) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    })
    const role = await this.roleService.getRoleByName(dto.name)
    if (role && user) {
      await this.prisma.userRole.create({
        data: { user_id: user.id, role_id: role.id },
      })
      return dto
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    )
  }
}
