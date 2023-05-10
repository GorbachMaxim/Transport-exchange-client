import { makeAutoObservable } from 'mobx';
import api from '../core/api/api';
import Review from '../core/types/review';
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

  async addReview(book: Book, review: Review): Promise<void> {
    await api.addReview(book, review);
  }

  getReviews() {
    return this.reviews;
  }
}

export default ReviewStore;
