import Author from './author';
import Review from './review';
import Genre from './genre';

interface Book {
  id: number;
  name: string;
  isbn: string;
  author: Author;
  genre: Genre;
  description: string;
  image: string;
  reviews: Review[];
}

type BookCreateData = Omit<Book, 'id' | 'reviews'>;

export default Book;
export type { BookCreateData };
