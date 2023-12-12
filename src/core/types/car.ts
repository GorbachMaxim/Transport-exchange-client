interface Car {
  id: number | null;
  model: string;
  mass: string;
  volume: string;
  description: string;
  image: string;
}

type CarCreateData = Omit<Car, 'id'>;

export default Car;
export type { CarCreateData };
