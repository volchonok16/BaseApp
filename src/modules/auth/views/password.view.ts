import { ApiProperty } from '@nestjs/swagger';

export class PasswordView {
  @ApiProperty()
  password: string;
}
