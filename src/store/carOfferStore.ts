import { makeAutoObservable } from 'mobx';
import api from '../core/api/api';
import ConfirmationStore from './confirmationStore';
import CarOffer, { CarOfferCreateData } from '../core/types/carOffer';

class CarOfferStore {
  private carOffers: CarOffer[] = [];

  constructor(private confirmationStore: ConfirmationStore) {
    makeAutoObservable(this);
  }

  private async deleteCarOfferById(id: number): Promise<void> {
    const response = await api.deleteCarOfferById(id);

    if (response !== null) {
      this.carOffers = this.carOffers.filter((carOffer) => carOffer.id !== id);
    }
  }

  deleteCarOffer(carOffer: CarOffer): void {
    this.confirmationStore.show(
      'Удалить эту машину?',
      carOffer.car.model,
      async () => {
        await this.deleteCarOfferById(carOffer.id);
      },
    );
  }

  deleteCarOfferWithNavigate(carOffer: CarOffer, onConfirm: () => void): void {
    this.confirmationStore.show(
      'Удалить эту машину?',
      carOffer.car.model,
      async () => {
        await this.deleteCarOfferById(carOffer.id);
        onConfirm();
      },
    );
  }

  async fetchCarOffers(): Promise<void> {
    const fetchedCarOffers = await api.fetchCarOffers();

    if (fetchedCarOffers !== null) {
      this.carOffers = fetchedCarOffers;
    }
  }

  async fetchCarOfferById(id: number): Promise<CarOffer | null> {
    return await api.fetchCarOfferById(id);
  }

  async createCarOffer(carOffer: CarOfferCreateData): Promise<void> {
    await api.createCarOffer(carOffer);

    // if (response !== null) {
    //   this.books = [...this.books, response];
    // }
  }

  async updateCarOffer(carOffer: CarOffer): Promise<CarOffer | null> {
    return await api.updateCarOffer(carOffer);
  }

  // async searchBooks(search: string): Promise<void> {
  //   const fetchedBooks = await api.fetchSearchBooks(search);
  //   console.log(fetchedBooks);
  //   if (fetchedBooks !== null) {
  //     this.books = fetchedBooks;
  //   }
  // }

  getCarOffers() {
    return this.carOffers;
  }
}

export default CarOfferStore;
