import { makeAutoObservable } from 'mobx';
import api from '../core/api/api';
import Book, { BookCreateData } from '../core/types/book';
import Author from '../core/types/author';
import Genre from '../core/types/genre';

class GenreStore {
  private genres: Genre[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchGenres(): Promise<void> {
    const fetchedGenres = await api.fetchGenres();

    if (fetchedGenres !== null) {
      this.genres = fetchedGenres;
    }
  }

  // async createGenre(genre: BookCreateData): Promise<void> {
  //   const response = await api.createBook(book);
  //
  //   if (response !== null) {
  //     console.log(response);
  //     this.books = [...this.books, response];
  //   }
  // }

  getGenres() {
    return this.genres;
  }
}

export default GenreStore;
