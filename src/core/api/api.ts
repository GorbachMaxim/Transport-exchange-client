import {
  ACCOUNT_URL,
  APOD_URL,
  AUTHORS_URL,
  BASE_URL,
  BOOKS_URL,
  CHATGPT_URL,
  EMAIL_URL,
  GENRES_URL,
  REVIEWS_URL,
  SEARCH_URL,
  SIGNIN_URL,
  SIGNUP_URL,
  STATISTICS_URL,
  USERS_URL,
} from '../constants/apiConstants';
import User, { AuthData, UpdatePassword, UserApiResponse } from '../types/user';
import axios from 'axios';
import { getCookie } from '../utils/cookie';
import Author from '../types/author';
import Book, { BookCreateData } from '../types/book';
import Genre, { GenreCreateData } from '../types/genre';
import GptAdvice from '../types/gptAdvice';
import Review from '../types/review';
import Apod from '../types/apod';
import Statistics from '../types/statistics';

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

interface IApi {
  fetch: <T>(
    method: RequestMethod,
    url: string,
    config: object,
  ) => Promise<any>;
  signUp: (user: AuthData) => Promise<UserApiResponse | null>;
  signIn: (user: AuthData) => Promise<UserApiResponse | null>;
  // signIn: (user: User) => Promise<UserApiResponse | null>;
  fetchAuthors: () => Promise<Author[] | null>;
  fetchAuthorById: (id: number) => Promise<Author | null>;
}

class Api implements IApi {
  async fetch<T>(
    method: RequestMethod,
    url: string,
    config?: object,
  ): Promise<T | null> {
    try {
      const response = await axios({
        baseURL: `${BASE_URL}`,
        method,
        url,
        ...config,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.toJSON());
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async fetchUser(): Promise<User | null> {
    const token = getCookie('token');

    if (token) {
      return await this.fetch('get', ACCOUNT_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return null;
  }

  async signUp(user: AuthData): Promise<UserApiResponse | null> {
    return await this.fetch('post', SIGNUP_URL, {
      data: {
        ...user,
      },
    });
  }

  async signIn(user: AuthData): Promise<UserApiResponse | null> {
    return await this.fetch('post', SIGNIN_URL, {
      data: {
        ...user,
      },
    });
  }

  async fetchUsers(): Promise<User[] | null> {
    const token = getCookie('token');
    return await this.fetch('get', USERS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async deleteUserById(id: number): Promise<void | null> {
    const token = getCookie('token');
    await this.fetch('delete', `${USERS_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async fetchUserById(id: number): Promise<User | null> {
    const token = getCookie('token');
    return await this.fetch('get', `${USERS_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updatePassword(passwords: UpdatePassword): Promise<void> {
    const token = getCookie('token');
    await this.fetch('put', `${USERS_URL}/password/${passwords.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...passwords,
      },
    });
  }

  async verifyUser(): Promise<void> {
    const token = getCookie('token');
    await this.fetch('get', `${EMAIL_URL}/verification`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async addReadBook(book: Book): Promise<void> {
    const token = getCookie('token');
    await this.fetch('put', `${USERS_URL}/readbook/${book.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...book,
      },
    });
  }

  async removeReadBook(book: Book): Promise<void> {
    const token = getCookie('token');
    await this.fetch('delete', `${USERS_URL}/readbook/${book.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async fetchReadBooks(userId: number): Promise<Book[] | null> {
    const token = getCookie('token');
    return await this.fetch<Book[]>('get', `/api/readbook/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async fetchAuthors(): Promise<Author[] | null> {
    const token = getCookie('token');
    return await this.fetch('get', AUTHORS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async fetchAuthorById(id: number): Promise<Author | null> {
    const token = getCookie('token');
    return await this.fetch('get', `${AUTHORS_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updateAuthor(author: Author): Promise<Author | null> {
    const token = getCookie('token');
    const response = await this.fetch<Author>('put', AUTHORS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...author,
      },
    });

    return response;
  }

  async deleteAuthorById(id: number): Promise<void | null> {
    const token = getCookie('token');
    await this.fetch('delete', `${AUTHORS_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createAuthor(author: Author): Promise<void> {
    const token = getCookie('token');
    await this.fetch('post', `${AUTHORS_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...author,
      },
    });
  }

  async fetchBooks(): Promise<Book[] | null> {
    const token = getCookie('token');
    return await this.fetch('get', BOOKS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createBook(book: BookCreateData): Promise<Book | null> {
    const token = getCookie('token');
    return await this.fetch('post', BOOKS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...book,
      },
    });
  }

  async deleteBookById(id: number): Promise<void | null> {
    const token = getCookie('token');
    await this.fetch('delete', `${BOOKS_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async fetchBookById(id: number): Promise<Book | null> {
    const token = getCookie('token');
    return await this.fetch('get', `${BOOKS_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updateBook(book: Book): Promise<Book | null> {
    const token = getCookie('token');
    const response = await this.fetch<Book>('put', BOOKS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...book,
      },
    });

    return response;
  }

  async fetchReviews(bookId: number): Promise<Review[] | null> {
    const token = getCookie('token');
    console.log(`${REVIEWS_URL}/${bookId}`);
    return await this.fetch('get', `${REVIEWS_URL}/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async addReview(book: Book, review: Review): Promise<Review | null> {
    const token = getCookie('token');
    return await this.fetch('post', `${REVIEWS_URL}/${book.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...review,
      },
    });
  }

  async deleteReview(reviewId: number): Promise<void> {
    const token = getCookie('token');
    await this.fetch('delete', `${REVIEWS_URL}/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async fetchGenres(): Promise<Genre[] | null> {
    const token = getCookie('token');
    return await this.fetch('get', GENRES_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async fetchGenreById(id: number): Promise<Genre | null> {
    const token = getCookie('token');
    return await this.fetch('get', `${GENRES_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createGenre(genre: Genre): Promise<Genre | null> {
    const token = getCookie('token');
    return await this.fetch('post', GENRES_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...genre,
      },
    });
  }

  async deleteGenreById(id: number): Promise<void | null> {
    const token = getCookie('token');
    await this.fetch('delete', `${GENRES_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updateGenre(genre: Genre): Promise<Genre | null> {
    const token = getCookie('token');
    const response = await this.fetch<Genre>('put', `${GENRES_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...genre,
      },
    });

    return response;
  }

  async getGPTAdvice(): Promise<GptAdvice | null> {
    const token = getCookie('token');
    return await this.fetch('get', CHATGPT_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async fetchApod(): Promise<Apod | null> {
    const token = getCookie('token');
    return await this.fetch('get', APOD_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async fetchStatistics(): Promise<Statistics[] | null> {
    const token = getCookie('token');
    return await this.fetch('get', STATISTICS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async fetchSearchBooks(search: string): Promise<Book[] | null> {
    const token = getCookie('token');
    return await this.fetch('get', `${SEARCH_URL}/${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const api = new Api();

export default api;
