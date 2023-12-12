import User from './user';

interface Review {
  id: number;
  mark: number;
  text: string;
  user: User;
}

type CommentCreateData = Omit<Review, 'id' | 'user'>;

export default Review;
export type { CommentCreateData };
