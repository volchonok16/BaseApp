import { ApiProperty } from '@nestjs/swagger';

export class IdView {
  @ApiProperty()
  id: string;
}
