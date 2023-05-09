export interface Default {
  name: string;
  url: string;
};

export interface ListPokemons {
  count: number;
  next: string;
  previous: string;
  results: Default[];
}
