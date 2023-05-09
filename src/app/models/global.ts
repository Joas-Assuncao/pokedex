export interface Default {
  name: string;
  url: string;
  id?: string;
  sprites?: any;
};

export interface ListPokemons {
  count: number;
  next: string;
  previous: string;
  results: Default[];
}
