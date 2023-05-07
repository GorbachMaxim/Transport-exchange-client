interface Genre {
  id: number;
  name: string;
  image: string;
  description: string;
}

type GenreCreateData = Omit<Genre, 'id'>;

export default Genre;
export type { GenreCreateData };
