import Cargo from './cargo';
import Company from './company';

interface CargoOffer {
  id: number;
  fromCity: string;
  toCity: string;
  price: string;
  cargo: Cargo;
  company: Company;
}

type CargoOfferCreateData = Omit<CargoOffer, 'id'>;

export default CargoOffer;
export type { CargoOfferCreateData };
