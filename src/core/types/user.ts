import Book from './book';
import Role from './roles';

interface User {
  id: number;
  username: string;
  email: string;
  // isVerified: boolean;
  // readBooks: Book[];
  roles: Role[];
}

type AuthData = Pick<User, 'username' | 'email'> & { password: string };
type UserApiResponse = User & { token: string };
type UpdatePassword = Pick<User, 'id'> & {
  password: string;
};

export default User;
export type { AuthData, UserApiResponse, UpdatePassword };
