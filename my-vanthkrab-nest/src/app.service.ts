import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return ({
        message: 'Hello from NestJS!',
        timestamp: new Date().toISOString(),
        status: 'success',
    })
  }
}
