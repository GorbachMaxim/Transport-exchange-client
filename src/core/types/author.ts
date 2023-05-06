interface Author {
  id: number;
  biography: string;
  image: string;
  name: string;
  surname: string;
}

type AuthorCreateData = Omit<Author, 'id'>;

export default Author;
export type { AuthorCreateData };
