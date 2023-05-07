import { makeAutoObservable } from 'mobx';
import api from '../core/api/api';
import Book from '../core/types/book';

class BookStore {
  private books: Book[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchBooks(): Promise<void> {
    const fetchedBooks = await api.fetchBooks();
    console.log(fetchedBooks);
    if (fetchedBooks !== null) {
      this.books = fetchedBooks;
    }
  }

  getBooks() {
    return this.books;
  }
}

export default BookStore;
