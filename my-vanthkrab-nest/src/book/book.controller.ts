import { Controller, Get, Param } from '@nestjs/common';


@Controller('book')
export class BookController {
    @Get()
    findAll() {
        return 'This action returns all books';
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns a #${id} book`;
    }
}