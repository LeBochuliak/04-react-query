import type { Movie } from '../../types/movie'
import css from './MovieGrid.module.css'
import noImage from '../../images/noImage.jpg'

interface MovieGridProps {
    movies: Movie[];
    onSelect: (movie: Movie) => void;
}


export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
    
    return (
        <ul className={css.grid}>
            {movies.map((movie: Movie) => {
                const imageUrl = movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : noImage;
                return (
                    <li key={movie.id} onClick={() => onSelect(movie)}>
                        <div className={css.card}>
                            <img
		                     className={css.image}
		                     src={imageUrl}
		                      alt={movie.title}
		                      loading='lazy'
		                    />
	                        <h2 className={css.title}>{movie.title}</h2>
                        </div>
                    </li>)
                })
            }
            
        </ul>
    )
}