import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {PrismaService} from "prisma.service";
import {RolesModule} from "roles/roles.module";
import {AuthModule} from "auth/auth.module";

@Module({
  providers: [PrismaService, UsersService],
  controllers: [UsersController],
  imports: [RolesModule, forwardRef(() => AuthModule)],
  exports: [UsersService]
})
export class UsersModule {}
