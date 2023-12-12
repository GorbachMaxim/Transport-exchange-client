interface Cargo {
  id: number | null;
  weight: string;
  type: string;
  description: string;
  image: string;
}

type CargoCreateData = Omit<Cargo, 'id'>;

export default Cargo;
export type { CargoCreateData };
