import { makeAutoObservable } from 'mobx';
import api from '../core/api/api';
import Genre, { GenreCreateData } from '../core/types/genre';

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

  async createGenre(genre: Genre): Promise<void> {
    const response = await api.createGenre(genre);

    // if (response !== null) {
    //   this.genres = [...this.genres, response];
    // }
  }

  getGenres() {
    return this.genres;
  }
}

export default GenreStore;
