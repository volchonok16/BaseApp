import { ApiProperty } from '@nestjs/swagger';

export class ErrorResult {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  messages: FieldError[];

  @ApiProperty()
  error: string;
}

export class FieldError {
  public message: string;
  public field: string;
}
