import { makeAutoObservable } from 'mobx';
import api from '../core/api/api';
import ConfirmationStore from './confirmationStore';
import CarOffer, { CarOfferCreateData } from '../core/types/carOffer';
import City from '../core/types/city';

class CityStore {
  public cities: City[] = [];

  async fetchCities(): Promise<void> {
    const fetchedCities = await api.fetchCities();

    if (fetchedCities !== null) {
      this.cities = fetchedCities;
    }
  }
}

export default CityStore;
