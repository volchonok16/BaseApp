import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class NewPasswordDto {
  @ApiProperty({ description: 'Новый пароль пользователя', example: 'qwerty' })
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  password: string;
}
