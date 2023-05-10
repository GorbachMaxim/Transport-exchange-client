import { makeAutoObservable } from 'mobx';
import api from '../core/api/api';
import Book, { BookCreateData } from '../core/types/book';
import Author from '../core/types/author';
import ConfirmationStore from './confirmationStore';
import Review from '../core/types/review';
import User from '../core/types/user';
import book from '../core/types/book';

class BookStore {
  private books: Book[] = [];

  constructor(private confirmationStore: ConfirmationStore) {
    makeAutoObservable(this);
  }

  private async deleteBookById(id: number): Promise<void> {
    const response = await api.deleteBookById(id);

    if (response !== null) {
      this.books = this.books.filter((book) => book.id !== id);
    }
  }

  deleteBook(book: Book): void {
    this.confirmationStore.show(
      'Delete this book?',
      book.name,
      async () => await this.deleteBookById(book.id),
    );
  }

  async fetchBooks(): Promise<void> {
    const fetchedBooks = await api.fetchBooks();
    console.log(fetchedBooks);
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

  async updateBook(book: Book): Promise<Book | null> {
    return await api.updateBook(book);
  }

  async searchBooks(search: string): Promise<void> {
    const fetchedBooks = await api.fetchSearchBooks(search);
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
