export class CreateLogDto {
  context: string;
  message: string;
  level: string;

  static create(data: CreateLogDto): CreateLogDto {
    return Object.assign(new CreateLogDto(), data);
  }
}
