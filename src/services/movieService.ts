import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesHttpResponse {
    results: Movie[];
}

const myKey = import.meta.env.VITE_TMDB_TOKEN;

axios.defaults.headers.common['Authorization'] = `Bearer ${myKey}`;
axios.defaults.headers.common['accept'] = 'application/json';

export default async function fetchMovies(query: string): Promise<Movie[]> {
    const response = await axios.get<MoviesHttpResponse>(`https://api.themoviedb.org/3/search/movie?query=${query}`);
      
    return response.data.results;
};
