import _movies from './movie.json';

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path?: string;
  genre_ids: number[];
  vote_average: number;
}


export interface Genre {
    id: number;
    name: string;
}

export const movies = _movies as Movie[];
