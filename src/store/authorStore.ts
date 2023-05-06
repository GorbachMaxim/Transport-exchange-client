import { makeAutoObservable } from 'mobx';
import api from '../core/api/api';
import Author from '../core/types/author';

class AuthorStore {
  private authors: Author[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAuthors(): Promise<void> {
    const fetchedAuthors = await api.fetchAuthors();

    if (fetchedAuthors !== null) {
      this.authors = fetchedAuthors;
    }
  }

  async fetchAuthorById(id: number): Promise<Author | null> {
    return await api.fetchAuthorById(id);
  }

  async updateAuthor(author: Author): Promise<Author | null> {
    return await api.updateAuthor(author);
  }

  async deleteAuthor(id: number): Promise<void | null> {
    const response = await api.deleteAuthorById(id);

    if (response !== null) {
      this.authors = this.authors.filter((author) => author.id !== id);
    }
  }

  async createAuthor(author: Author): Promise<void> {
    const response = api.createAuthor(author);

    if (response !== null) {
      this.authors = [...this.authors, author];
    }
  }

  sortByField(field: keyof Author): void {
    this.authors.sort((author1, author2) => {
      if (author1[field] < author2[field]) {
        return -1;
      }
      if (author1[field] > author2[field]) {
        return 1;
      }
      return 0;
    });
  }

  getAuthors() {
    return this.authors;
  }
}

export default AuthorStore;
