import { createStoreContext } from '../core/utils/createContext';
import UserStore from '../store/userStore';
import AuthorStore from '../store/authorStore';
import BookStore from '../store/bookStore';
import GenreStore from '../store/genreStore';

const userStore = new UserStore();
const authorStore = new AuthorStore();
const bookStore = new BookStore();
const genreStore = new GenreStore();

const { StoreProvider, useStore } = createStoreContext({
  UserStore: userStore,
  AuthorStore: authorStore,
  BookStore: bookStore,
  GenreStore: genreStore,
});

export { StoreProvider, useStore };
