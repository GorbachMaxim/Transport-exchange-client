import Author from './author';
import Review from './review';
import Genre from './genre';

interface Book {
  id: number;
  name: string;
  ISBN: string;
  author: Author;
  genre: Genre;
  description: string;
  image: string;
  reviews: Review[];
}

type BookCreateData = Omit<Book, 'id' | 'reviews'>;

// type BookCreateData = Omit<Book, 'author' | 'genres' | 'id' | 'reviews'> & {
//   author: number;
//   genres: number;
// };

export default Book;
export type { BookCreateData };
