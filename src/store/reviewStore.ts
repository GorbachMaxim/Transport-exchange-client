import { makeAutoObservable } from 'mobx';
import api from '../core/api/api';
import GptAdvice from '../core/types/gptAdvice';
import Review from '../core/types/review';
import User from '../core/types/user';
import Book from '../core/types/book';

class ReviewStore {
  private reviews: Review[] = null!;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchReviews(bookId: number): Promise<void> {
    const reviews = await api.fetchReviews(bookId);

    if (reviews !== null) {
      this.reviews = reviews;
    }
  }

  async addReview(
    user: User | null,
    book: Book,
    review: Review,
  ): Promise<void> {
    if (user !== null) {
      await api.addReview(user, book, review);
    }
  }

  getReviews() {
    return this.reviews;
  }
}

export default ReviewStore;
