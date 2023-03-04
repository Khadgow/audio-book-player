import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { CreateUserDto } from 'users/dto/create-user.dto'
import { UsersService } from 'users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { LoginDto } from 'auth/dto/login.dto'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto)
    return this.generateToken(user)
  }
  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email)
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      )
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    })
    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      username: user.username,
      id: user.id,
      // roles: user.roles,
    }
    return {
      user: payload,
      token: this.jwtService.sign(payload),
    }
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email)

    if (!user) {
      throw new UnauthorizedException({
        message: 'Некорректный емайл или пароль',
      })
    }
    const passwordEquals = await bcrypt.compare(
      loginDto.password,
      user?.password,
    )
    if (passwordEquals) {
      return user
    }
    throw new UnauthorizedException({
      message: 'Некорректный емайл или пароль',
    })
  }

  private async getMe(token: string) {
    return this.jwtService.verify(token)
  }
}
