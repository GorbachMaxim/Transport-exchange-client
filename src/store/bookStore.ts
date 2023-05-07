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

  async createBook(book: BookCreateData): Promise<void> {
    const response = await api.createBook(book);

    if (response !== null) {
      console.log(response);
      this.books = [...this.books, response];
    }
  }

  getBooks() {
    return this.books;
  }
}

export default BookStore;
