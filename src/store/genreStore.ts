import { makeAutoObservable } from 'mobx';
import api from '../core/api/api';
import Genre, { GenreCreateData } from '../core/types/genre';
import ConfirmationStore from './confirmationStore';
import Book from '../core/types/book';

class GenreStore {
  private genres: Genre[] = [];

  constructor(private confirmationStore: ConfirmationStore) {
    makeAutoObservable(this);
  }

  async fetchGenres(): Promise<void> {
    const fetchedGenres = await api.fetchGenres();

    if (fetchedGenres !== null) {
      this.genres = fetchedGenres;
    }
  }

  async fetchGenreById(id: number): Promise<Genre | null> {
    return await api.fetchGenreById(id);
  }

  async createGenre(genre: Genre): Promise<void> {
    const response = await api.createGenre(genre);

    // if (response !== null) {
    //   this.genres = [...this.genres, response];
    // }
  }

  async updateGenre(genre: Genre): Promise<Genre | null> {
    return await api.updateGenre(genre);
  }

  getGenres() {
    return this.genres;
  }
}

export default GenreStore;
