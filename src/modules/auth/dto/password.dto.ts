import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordDto {
  @ApiProperty({ description: 'Пароль пользователя', example: 'qwerty' })
  @IsString()
  @IsNotEmpty()
  password: string | null;
}
