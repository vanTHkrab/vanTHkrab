import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { Book } from './book';
import { BookService } from './book.service';

@Module({
  controllers: [BookController],
  providers: [Book, BookService]
})
export class BookModule {}
