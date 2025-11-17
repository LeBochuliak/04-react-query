import css from './App.module.css'
import { useEffect, useState } from 'react';
import type { Movie } from '../../types/movie'
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'
import fetchMovies from '../../services/movieService'
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';



export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data: movies, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movie', query, page],  
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim() !== '', 
    placeholderData: keepPreviousData,
  });
 
  useEffect(() => {
    if (error) {
    toast.error(error.message);
  }
  }, [error])

  useEffect(() => {
    if (movies?.results.length === 0) {
    toast.error('No movies found for your request');
  }
  }, [movies])
  
   const handleSearch = (query: string) => {
    setQuery(query);
    setPage(1);
  };
  
  const totalPages = movies?.total_pages ?? 0;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }
  const handleClickMovieGrid = (movie: Movie) => {
    setSelectedMovie(movie);
    openModal();
  }
 

  return (
    <div className={css.app}>
      <Toaster position='top-center'/>
      <SearchBar onSubmit={handleSearch}/>
      {isSuccess && totalPages > 1 && <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />}
      {movies && movies.results.length > 0 && <MovieGrid movies={movies.results} onSelect={handleClickMovieGrid}/>}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {selectedMovie && isModalOpen && <MovieModal onClose={closeModal} movie={selectedMovie}/>}
    </div>
  )
}

