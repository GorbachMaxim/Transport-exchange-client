import Car from './car';
import Company from './company';

interface CarOffer {
  id: number;
  fromCity: string;
  toCity: string;
  price: string;
  car: Car;
  company: Company;
}

type CarOfferCreateData = Omit<CarOffer, 'id'>;

export default CarOffer;
export type { CarOfferCreateData };
