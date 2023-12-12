import User from './user';

interface Comment {
  id: number;
  text: string;
  user: User;
}

type CommentCreateData = Omit<Comment, 'id' | 'user'>;

export default Comment;
export type { CommentCreateData };
