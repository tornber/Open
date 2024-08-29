import { Injectable } from '@nestjs/common';
import { Book } from './FakeDB';
import { books } from './FakeDB';

@Injectable()
export class BooksService {
  getAllBooks(): Book[] {
    return books;
  }

  findById(bookID : number) : Book | undefined {
    return books.find((book) => book.id === bookID)
  }

  addBook(book : Partial<Book>) : Book {
    const newId = books[books.length - 1].id + 1;

    const newBook : Book = {
      id: newId,
      author: book.author ?? '',
      title: book.title ?? '',
      publicationYear: book.publicationYear ?? 0
    }

    books.push(newBook);

    return newBook
  }

  update(id : number, newBook : Partial<Book>) : Book | undefined {
    
    const Oldbook : Book = books.find((book) => book.id === id)

    if (Oldbook === null) return undefined

    const updatedBook : Book = {
      id: id,
      author: newBook.author ?? Oldbook.author,
      title: newBook.title ?? Oldbook.title,
      publicationYear: newBook.publicationYear ?? Oldbook.publicationYear
    }
    
    books[id - 1] = updatedBook 

    return updatedBook

  }

  delete(id : number) : Book[] {
    // books = books.filter(book => book.id !== id)
    books.splice(id - 1,1)
    return books;
  }
}
