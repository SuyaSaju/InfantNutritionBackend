import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getProductName(): string {
    return 'Infant Nutrition';
  }
}
