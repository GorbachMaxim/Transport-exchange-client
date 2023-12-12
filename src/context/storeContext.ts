import { createStoreContext } from '../core/utils/createContext';
import UserStore from '../store/userStore';
import ConfirmationStore from '../store/confirmationStore';
import ClientStore from '../store/clientStore';
import ReviewStore from '../store/reviewStore';
import CarOfferStore from '../store/carOfferStore';
import CargoOfferStore from '../store/cargoOfferStore';
import CompanyStore from '../store/companyStore';
import CityStore from '../store/cityStore';
import CommentStore from '../store/commentStore';

const confirmationStore = new ConfirmationStore();
const userStore = new UserStore();
const clientStore = new ClientStore(confirmationStore);
const reviewStore = new ReviewStore();
const commentStore = new CommentStore();

const carOfferStore = new CarOfferStore(confirmationStore);
const cargoOfferStore = new CargoOfferStore(confirmationStore);
const companyStore = new CompanyStore(confirmationStore);
const cityStore = new CityStore();

const { StoreProvider, useStore } = createStoreContext({
  UserStore: userStore,
  ConfirmationStore: confirmationStore,
  ClientStore: clientStore,
  ReviewStore: reviewStore,
  CommentStore: commentStore,

  CarOfferStore: carOfferStore,
  CargoOfferStore: cargoOfferStore,
  CompanyStore: companyStore,
  CityStore: cityStore,
});

export { StoreProvider, useStore };
