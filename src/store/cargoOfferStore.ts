import { makeAutoObservable } from 'mobx';
import api from '../core/api/api';
import ConfirmationStore from './confirmationStore';
import CargoOffer, { CargoOfferCreateData } from '../core/types/cargoOffer';
import CarOffer from '../core/types/carOffer';

class CargoOfferStore {
  private cargoOffers: CargoOffer[] = [];

  constructor(private confirmationStore: ConfirmationStore) {
    makeAutoObservable(this);
  }

  private async deleteCargoOfferById(id: number): Promise<void> {
    const response = await api.deleteCargoOfferById(id);

    if (response !== null) {
      this.cargoOffers = this.cargoOffers.filter(
        (cargoOffer) => cargoOffer.id !== id,
      );
    }
  }

  deleteCargoOffer(cargoOffer: CargoOffer): void {
    this.confirmationStore.show(
      'Удалить этот груз?',
      cargoOffer.cargo.type,
      async () => await this.deleteCargoOfferById(cargoOffer.id),
    );
  }

  deleteCargoOfferWithNavigate(
    cargoOffer: CargoOffer,
    onConfirm: () => void,
  ): void {
    this.confirmationStore.show(
      'Удалить эту машину?',
      cargoOffer.cargo.type,
      async () => {
        await this.deleteCargoOfferById(cargoOffer.id);
        onConfirm();
      },
    );
  }

  async fetchCargoOffers(): Promise<void> {
    const fetchedCargoOffers = await api.fetchCargoOffers();

    if (fetchedCargoOffers !== null) {
      this.cargoOffers = fetchedCargoOffers;
    }
  }

  async fetchCargoOfferById(id: number): Promise<CargoOffer | null> {
    return await api.fetchCargoOfferById(id);
  }

  async createCargoOffer(cargoOffer: CargoOfferCreateData): Promise<void> {
    const response = await api.createCargoOffer(cargoOffer);

    // if (response !== null) {
    //   this.books = [...this.books, response];
    // }
  }

  async updateCargoOffer(cargoOffer: CargoOffer): Promise<CargoOffer | null> {
    return await api.updateCargoOffer(cargoOffer);
  }

  // async searchBooks(search: string): Promise<void> {
  //   const fetchedBooks = await api.fetchSearchBooks(search);
  //   console.log(fetchedBooks);
  //   if (fetchedBooks !== null) {
  //     this.books = fetchedBooks;
  //   }
  // }

  getCargoOffers() {
    return this.cargoOffers;
  }
}

export default CargoOfferStore;
