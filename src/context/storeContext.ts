import { createStoreContext } from '../core/utils/createContext';
import UserStore from '../store/userStore';
import AuthorStore from '../store/authorStore';
import BookStore from '../store/bookStore';
import GenreStore from '../store/genreStore';
import ConfirmationStore from '../store/confirmationStore';
import ClientStore from '../store/clientStore';

const confirmationStore = new ConfirmationStore();
const userStore = new UserStore();
const authorStore = new AuthorStore(confirmationStore);
const bookStore = new BookStore(confirmationStore);
const genreStore = new GenreStore(confirmationStore);
const clientStore = new ClientStore(confirmationStore);

const { StoreProvider, useStore } = createStoreContext({
  UserStore: userStore,
  AuthorStore: authorStore,
  BookStore: bookStore,
  GenreStore: genreStore,
  ConfirmationStore: confirmationStore,
  ClientStore: clientStore,
});

export { StoreProvider, useStore };
