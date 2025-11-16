import css from './App.module.css'
import { useState } from 'react';
import type { Movie } from '../../types/movie'
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'
import fetchMovies from '../../services/movieService'
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';



export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }
  const handleClickMovieGrid = (movie: Movie) => {
    setSelectedMovie(movie);
    openModal();
  }


  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await fetchMovies(query);
      if (data.length === 0) {
        toast.error('No movies found for your request');
        setMovies([]);
        return;
      }
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className={css.app}>
      <Toaster position='top-center'/>
      <SearchBar onSubmit={handleSearch}/>
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={handleClickMovieGrid}/>}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {selectedMovie && isModalOpen && <MovieModal onClose={closeModal} movie={selectedMovie}/>}
    </div>
  )
}

