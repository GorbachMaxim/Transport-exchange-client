import React, { useEffect, useState } from 'react';
import styles from './GenrePage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../../../context/storeContext';
import { GENRES_URL } from '../../../core/constants/apiConstants';
import Genre from '../../../core/types/genre';

const GenrePage = observer(() => {
  const [genre, setGenre] = useState<Genre>(null!);
  const genreStore = useStore('GenreStore');
  const { genreId } = useParams();
  const navigate = useNavigate();

  const fetchGenre = async () => {
    const receivedGenre = await genreStore.fetchGenreById(Number(genreId));
    if (receivedGenre) {
      setGenre(receivedGenre);
    } else {
      navigate(GENRES_URL);
    }
  };

  useEffect(() => {
    fetchGenre();
  }, []);

  return (
    <div className={`${styles.genrePage} container page`}>
      {genre && (
        <div className={styles.content}>
          <div className={styles.image}>
            <img src={genre.image} alt="genre illustration" />
          </div>
          <div className={styles.text}>
            <h2 className={styles.name}>{genre.name}</h2>
            <p>{genre.description}</p>
          </div>
        </div>
      )}
    </div>
  );
});

export default GenrePage;
