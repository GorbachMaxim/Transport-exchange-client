import { makeAutoObservable } from 'mobx';
import api from '../core/api/api';
import Apod from '../core/types/apod';

class AuthorStore {
  private apod: Apod = null!;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchApod(): Promise<void> {
    const fetchedApod = await api.fetchApod();

    if (fetchedApod !== null) {
      this.apod = fetchedApod;
    }
  }

  getApod() {
    return this.apod;
  }
}

export default AuthorStore;
