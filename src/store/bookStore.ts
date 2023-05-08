import { makeAutoObservable } from 'mobx';
import api from '../core/api/api';
import Book, { BookCreateData } from '../core/types/book';
import Author from '../core/types/author';

class BookStore {
  private books: Book[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchBooks(): Promise<void> {
    const fetchedBooks = await api.fetchBooks();

    if (fetchedBooks !== null) {
      this.books = fetchedBooks;
    }
  }

  async fetchBookById(id: number): Promise<Book | null> {
    return await api.fetchBookById(id);
  }

  async createBook(book: BookCreateData): Promise<void> {
    const response = await api.createBook(book);

    // if (response !== null) {
    //   this.books = [...this.books, response];
    // }
  }

  async deleteBook(id: number): Promise<void> {
    const response = await api.deleteBookById(id);

    if (response !== null) {
      this.books = this.books.filter((book) => book.id !== id);
    }
  }
  async updateBook(book: Book): Promise<Book | null> {
    return await api.updateBook(book);
  }

  getBooks() {
    return this.books;
  }
}

export default BookStore;
