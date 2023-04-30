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
    const author = await api.fetchAuthorById(id);
    return author;
  }

  async updateAuthor(author: Author): Promise<Author | null> {
    const updatedAuthor = await api.updateAuthorById(author);
    return updatedAuthor;
  }

  getAuthors() {
    return this.authors;
  }
}

export default AuthorStore;
