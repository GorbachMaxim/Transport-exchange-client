import {
  AUTHORS_URL,
  BASE_URL,
  SIGNIN_URL,
  SIGNUP_URL,
} from '../constants/apiConstants';
import User, { AuthData, UserApiResponse } from '../types/user';
import axios from 'axios';
import { getCookie } from '../utils/cookie';
import Author from '../types/author';

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

  async updateAuthorById(author: Author): Promise<Author | null> {
    const token = getCookie('token');
    const response = await this.fetch<Author>('put', AUTHORS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        author,
      },
    });

    console.log(response);

    return response;
  }
}

export default new Api();
