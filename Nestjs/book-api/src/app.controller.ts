import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './app.service';
import { Book } from './FakeDB';

@Controller('/books')
export class BooksController {
  constructor(private readonly appService: BooksService) {}

  @Get()
  getAllBooks(): Book[] {
    return this.appService.getAllBooks();
  }

  @Get(':id')
  getBookById(@Param('id') id : string) : Book {
    const bookID = +id
    return this.appService.findById(bookID)
  }

  @Post()
  addBook(@Body() book : Partial<Book>) : Book | undefined {
    if (!book.publicationYear || !book.author || !book.title) return undefined;
    this.appService.addBook(book);
  }

  @Put(":id")
  updateBook(@Param() id : string,@Body() book : Partial<Book>) : Book | undefined {
    if (!id) return undefined
    this.appService.update(+id,book);
  }

  @Delete(":id")
  deleteBook(@Param() id : string) : Book[] {
    return this.appService.delete(+id)
  }


}
