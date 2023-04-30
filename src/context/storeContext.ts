import { createStoreContext } from '../core/utils/createContext';
import UserStore from '../store/userStore';
import AuthorStore from '../store/authorStore';

const userStore = new UserStore();
const authorStore = new AuthorStore();

const { StoreProvider, useStore } = createStoreContext({
  UserStore: userStore,
  AuthorStore: authorStore,
});

export { StoreProvider, useStore };
