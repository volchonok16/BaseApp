import { ApiProperty } from '@nestjs/swagger';

export class MeView {
  @ApiProperty()
  id: string;

  @ApiProperty()
  login: string;

  static toView(data) {
    return Object.assign(new MeView(), data);
  }
}
