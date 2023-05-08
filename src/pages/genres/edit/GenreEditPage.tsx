import React, { useEffect, useState } from 'react';
import styles from './GenreEditPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { GENRES_ROUTE } from '../../../core/constants/routes';
import { useStore } from '../../../context/storeContext';
import Genre from '../../../core/types/genre';
import GenreEditForm from '../../../components/forms/genre/edit/GenreEditForm';

const GenreEditPage = () => {
  const [genre, setGenre] = useState<Genre>(null!);
  const genreStore = useStore('GenreStore');
  const { genreId } = useParams();
  const navigate = useNavigate();

  const updateGenre = async (genre: Genre) => {
    const response = await genreStore.updateGenre(genre);

    if (response !== null) {
      navigate(`${GENRES_ROUTE}/${genre.id}`);
    }
  };

  const fetchGenre = async () => {
    const receivedGenre = await genreStore.fetchGenreById(Number(genreId));
    if (receivedGenre) {
      setGenre(receivedGenre);
    } else {
      navigate(GENRES_ROUTE);
    }
  };

  useEffect(() => {
    fetchGenre();
  }, []);

  return (
    <main className={`${styles.genreEditPage} container page`}>
      <h2 className={`pageTitle`}>Edit Genre</h2>
      {genre && <GenreEditForm genre={genre} onSubmit={updateGenre} />}
    </main>
  );
};

export default GenreEditPage;
