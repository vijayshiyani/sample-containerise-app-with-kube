import { ApiProperty } from '@nestjs/swagger';

export class VersionDto {
  @ApiProperty()
  version: string;
  @ApiProperty()
  lastcommitsha: string;
  @ApiProperty()
  description: string;
}
