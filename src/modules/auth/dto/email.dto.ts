import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class EmailDto {
  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'somemail@gmail.com',
  })
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  email: string;
}
