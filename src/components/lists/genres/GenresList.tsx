import React, { useEffect, lazy } from 'react';
import styles from './GenresList.module.scss';
import Genre from '../../../core/types/genre';
import GenreCard from '../../cards/genre/GenreCard';
import { useStore } from '../../../context/storeContext';
import BookCard from '../../cards/book/BookCard';

const GenresList = () => {
  const genreStore = useStore('GenreStore');

  return (
    <div className={styles.list}>
      {genreStore.getGenres().length > 0 ? (
        genreStore
          .getGenres()
          .map((genre) => <GenreCard genre={genre} key={genre.id} />)
      ) : (
        <div>There are no genres</div>
      )}
    </div>
  );
};

export default GenresList;
