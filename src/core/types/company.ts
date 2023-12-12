import Review from './review';

interface Company {
  id: number;
  name: string;
  email: string;
  number: string;
  username: string;
  description: string;
  image: string;
  reviews: Review[];
  avgScore: number;
}

type CompanyCreateData = Omit<Company, 'id' | 'reviews'>;

export default Company;
export type { CompanyCreateData };
