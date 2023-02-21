import { IsString } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;
  @IsString({ message: 'Должно быть строкой' })
  readonly userId: string;
}
