import { Controller, ForbiddenException, Get, Param, Req, UnauthorizedException, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';
import { FileNotFoundException } from './file-not-found.exceptions';
import { MyCustomExceptionFilter } from './my-custom-exception.filter';
import { Query, UsePipes } from '@nestjs/common/decorators';
import { UppercasePipe } from './uppercase/uppercase.pipe';

@Controller('default')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/q')
  @UsePipes(UppercasePipe)
  query(@Query('city') city, @Query('state')state, @Query('country')country) {

    return { city, state, country }
  }

  @Get('/hello')
  @UseFilters(MyCustomExceptionFilter)
  hello() {
    throw new ForbiddenException();
  }

  @Get('/:filename')
  sendFile(@Param('filename') filename: string) {
    try {
      let content = fs.readFileSync(filename);
      return content;
    } catch (error) {
      let err = {
        timestamp: new Date().toISOString(),
        message: error.message
      };
      throw new FileNotFoundException(err);
    }
  }

  @Get()
  getHello(@Req() req): string {
    let auth = req.header("Authorization");

    if (!auth)
      throw new UnauthorizedException("Authorization header is missing in the request");

    return this.appService.getHello();
  }
}
