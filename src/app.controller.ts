import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { MyApplicationDto } from './dto/myapplication.dto';

@ApiTags('General')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/version')
  @ApiOperation({
    summary: 'Get a application version',
  })
  @ApiOkResponse({
    type: MyApplicationDto,
  })
  getVersion(): MyApplicationDto {
    return this.appService.getVersion();
  }
}
