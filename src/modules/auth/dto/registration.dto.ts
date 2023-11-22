import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegistrationDto {
  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'somemail@gmail.com',
  })
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Логин пользователя',
    example: 'MyLogin',
  })
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  login?: string;

  @ApiProperty({ description: 'Пароль пользователя', example: 'qwerty' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
