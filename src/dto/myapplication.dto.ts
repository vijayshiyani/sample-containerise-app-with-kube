import { ApiProperty } from '@nestjs/swagger';
import { VersionDto } from './version.dto';

export class MyApplicationDto {
  @ApiProperty({ type: VersionDto })
  myapplication: VersionDto[];
}
