import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './MovieModal.module.css';
import type { Movie } from '../../types/movie'
import noImage from '../../images/noImage.jpg'

interface MovieModalProps {
  onClose: () => void;
  movie: Movie;
}

export default function MovieModal({ onClose, movie: { backdrop_path, title, overview, release_date, vote_average }}: MovieModalProps) {
  
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => { 
        if (event.target === event.currentTarget) {
         onClose();
        }
    };

    useEffect(() => {
	  const handleKeyDown = (event: KeyboardEvent) => {
	    if (event.key === 'Escape') {
	      onClose();
	    }
	  };
	
	  document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
	
	  return () => {
	    document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
	  };
	}, [onClose]);

  const imageUrl = backdrop_path
                    ? `https://image.tmdb.org/t/p/original${backdrop_path}`
                    : noImage;

    return createPortal(
        <div className={css.backdrop} role='dialog' aria-modal='true' onClick={handleBackdropClick}>
          <div className={css.modal}>
            <button className={css.closeButton} aria-label='Close modal' onClick={onClose}>
              &times;
            </button>
            <img
              src={imageUrl}
              alt={title}
              className={css.image}
            />
            <div className={css.content}>
              <h2>{title}</h2>
              <p>{overview}</p>
              <p>
                <strong>Release Date:</strong> {release_date}
              </p>
              <p>
                <strong>Rating:</strong> {vote_average}/10
              </p>
            </div>
          </div>
        </div>,
        document.body
     );
}




