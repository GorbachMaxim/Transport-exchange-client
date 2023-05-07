import React from 'react';
import styles from './GenreCreatePage.module.scss';
import { useStore } from '../../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import GenreCreateForm from '../../../components/forms/genre/create/GenreCreateForm';
import { GENRES_ROUTE } from '../../../core/constants/routes';
import Genre, { GenreCreateData } from '../../../core/types/genre';

const GenreCreatePage = () => {
  const genreStore = useStore('GenreStore');
  const navigate = useNavigate();

  const onSubmit = async (genre: GenreCreateData) => {
    await genreStore.createGenre(genre as Genre);
    navigate(`${GENRES_ROUTE}`);
  };

  return (
    <main className={`${styles.genreCreatePage} container page`}>
      <h2 className={`pageTitle`}>Create Genre</h2>
      <GenreCreateForm onSubmit={onSubmit} />
    </main>
  );
};

export default GenreCreatePage;
