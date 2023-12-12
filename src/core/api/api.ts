import {
  ACCOUNT_URL,
  BASE_URL,
  EMAIL_URL,
  REVIEWS_URL,
  COMMENTS_URL,
  SIGNIN_URL,
  SIGNUP_URL,
  USERS_URL,
  CAR_OFFERS_URL,
  CARGO_OFFERS_URL,
  COMPANIES_URL,
  MY_COMPANY_URL,
  CITIES_URL,
  STATISTICS_URL,
  SEARCH_URL,
} from '../constants/apiConstants';
import User, { AuthData, UpdatePassword, UserApiResponse } from '../types/user';
import axios from 'axios';
import { getCookie } from '../utils/cookie';

import Statistics from '../types/statistics';

import Company, { CompanyCreateData } from '../types/company';
import CarOffer, { CarOfferCreateData } from '../types/carOffer';
import CargoOffer, { CargoOfferCreateData } from '../types/cargoOffer';

import Review from '../types/review';
import Comment from '../types/comment';

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

interface IApi {
  fetch: <T>(
    method: RequestMethod,
    url: string,
    config: object,
  ) => Promise<any>;
  signUp: (user: AuthData) => Promise<UserApiResponse | null>;
  signIn: (user: AuthData) => Promise<UserApiResponse | null>;
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

  async fetchCities(): Promise<Company[] | null> {
    const token = getCookie('token');
    return await this.fetch('get', CITIES_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async fetchCompanies(): Promise<Company[] | null> {
    const token = getCookie('token');
    return await this.fetch('get', COMPANIES_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async fetchCompanyById(id: number): Promise<Company | null> {
    const token = getCookie('token');
    return await this.fetch('get', `${COMPANIES_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async fetchMyCompany(): Promise<Company | null> {
    const token = getCookie('token');
    return await this.fetch('get', `${MY_COMPANY_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async deleteMyCompany(): Promise<void | null> {
    const token = getCookie('token');
    await this.fetch('delete', `${MY_COMPANY_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async deleteCompanyById(id: number): Promise<void | null> {
    const token = getCookie('token');
    await this.fetch('delete', `${COMPANIES_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createMyCompany(company: CompanyCreateData): Promise<void> {
    const token = getCookie('token');
    await this.fetch('post', `${MY_COMPANY_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...company,
      },
    });
  }

  async updateMyCompany(company: Company): Promise<Company | null> {
    const token = getCookie('token');
    const response = await this.fetch<Company>('put', MY_COMPANY_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...company,
      },
    });

    return response;
  }

  async fetchCarOffers(): Promise<CarOffer[] | null> {
    const token = getCookie('token');
    return await this.fetch('get', CAR_OFFERS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async fetchCarOfferById(id: number): Promise<CarOffer | null> {
    const token = getCookie('token');
    return await this.fetch('get', `${CAR_OFFERS_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updateCarOffer(carOffer: CarOffer): Promise<CarOffer | null> {
    const token = getCookie('token');
    const response = await this.fetch<CarOffer>('put', CAR_OFFERS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...carOffer,
      },
    });

    return response;
  }

  async deleteCarOfferById(id: number): Promise<void | null> {
    const token = getCookie('token');
    await this.fetch('delete', `${CAR_OFFERS_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createCarOffer(carOffer: CarOfferCreateData): Promise<void> {
    const token = getCookie('token');
    await this.fetch('post', `${CAR_OFFERS_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...carOffer,
      },
    });
  }

  async fetchCargoOffers(): Promise<CargoOffer[] | null> {
    const token = getCookie('token');
    return await this.fetch('get', CARGO_OFFERS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async fetchCargoOfferById(id: number): Promise<CargoOffer | null> {
    const token = getCookie('token');
    return await this.fetch('get', `${CARGO_OFFERS_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updateCargoOffer(cargoOffer: CargoOffer): Promise<CargoOffer | null> {
    const token = getCookie('token');
    const response = await this.fetch<CargoOffer>('put', CARGO_OFFERS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...cargoOffer,
      },
    });

    return response;
  }

  async deleteCargoOfferById(id: number): Promise<void | null> {
    const token = getCookie('token');
    await this.fetch('delete', `${CARGO_OFFERS_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createCargoOffer(cargoOffer: CargoOfferCreateData): Promise<void> {
    const token = getCookie('token');
    await this.fetch('post', `${CARGO_OFFERS_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...cargoOffer,
      },
    });
  }

  async fetchComments(offerId: number): Promise<Comment[] | null> {
    const token = getCookie('token');
    console.log(`${COMMENTS_URL}/${offerId}`);
    return await this.fetch('get', `${COMMENTS_URL}/${offerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async addComment(offerId: number, comment: Comment): Promise<Comment | null> {
    const token = getCookie('token');
    return await this.fetch('post', `${COMMENTS_URL}/${offerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...comment,
      },
    });
  }

  async deleteComment(commentId: number): Promise<void> {
    const token = getCookie('token');
    await this.fetch('delete', `${COMMENTS_URL}/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async fetchReviews(companyId: number): Promise<Review[] | null> {
    const token = getCookie('token');
    console.log(`${REVIEWS_URL}/${companyId}`);
    return await this.fetch('get', `${REVIEWS_URL}/${companyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async addReview(company: Company, review: Review): Promise<Review | null> {
    const token = getCookie('token');
    return await this.fetch('post', `${REVIEWS_URL}/${company.id}`, {
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

  async fetchStatistics(): Promise<Statistics[] | null> {
    const token = getCookie('token');
    return await this.fetch('get', STATISTICS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // async fetchSearchBooks(search: string): Promise<Book[] | null> {
  //   const token = getCookie('token');
  //   return await this.fetch('get', `${SEARCH_URL}/${search}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // }
}

const api = new Api();

export default api;
