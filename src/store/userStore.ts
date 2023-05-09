import { makeAutoObservable } from 'mobx';
import User, { AuthData } from '../core/types/user';
import api from '../core/api/api';
import { setCookie, deleteCookie } from '../core/utils/cookie';
import Book from '../core/types/book';

class UserStore {
  private user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUser(): Promise<void> {
    const user = await api.fetchUser();
    this.user = user;
  }

  async singIn(user: AuthData): Promise<void> {
    const response = await api.signIn(user);

    if (response !== null) {
      this.user = response;
      setCookie('token', response.token);
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  }

  async signUp(user: AuthData): Promise<void> {
    const response = await api.signUp(user);

    if (response !== null) {
      this.user = response;
    }
  }

  async logout(): Promise<void> {
    this.user = null;
    deleteCookie('token');
  }

  async fetchReadBooks(): Promise<void> {
    if (this.user !== null) {
      const response = await api.fetchReadBooks(this.user?.id);

      if (response !== null) {
        this.user.readBooks = response;
      }
    }
  }

  async addReadBook(book: Book): Promise<void> {
    await api.addReadBook(book);
  }

  async removeReadBook(book: Book): Promise<void> {
    await api.removeReadBook(book);
  }

  getUser() {
    return this.user;
  }
}

export default UserStore;
