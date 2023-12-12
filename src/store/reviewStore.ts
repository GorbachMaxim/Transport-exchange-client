import { makeAutoObservable } from 'mobx';
import api from '../core/api/api';
import Review from '../core/types/review';
import Company from '../core/types/company';

class ReviewStore {
  private reviews: Review[] = null!;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchReviews(companyId: number): Promise<void> {
    const reviews = await api.fetchReviews(companyId);

    if (reviews !== null) {
      this.reviews = reviews;
    }
  }

  async addReview(company: Company, review: Review): Promise<void> {
    await api.addReview(company, review);
  }

  async deleteReview(reviewId: number): Promise<void> {
    await api.deleteReview(reviewId);
  }

  getReviews() {
    return this.reviews;
  }
}

export default ReviewStore;
