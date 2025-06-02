import { Controller, Get, Headers } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Headers('x-api-key') xApiKey: string): string {
    try {
      console.log('x-api-key:', xApiKey);
      if (!xApiKey) {
        throw new Error('x-api-key header is missing');
      }
      return this.appService.getHello();
    }
    catch (error) {
      console.error('Error:', error.message);
      return `Error: ${error.message}`;
    }
  }
}
