import Book from './book';
import User from './user';

interface Review {
  id: number;
  mark: number;
  text: string;
  // book: Book;
  user: User;
}

type ReviewCreateData = Omit<Review, 'id' | 'user'>;

export default Review;
export type { ReviewCreateData };
