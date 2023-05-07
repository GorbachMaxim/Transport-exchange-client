import React, { useEffect } from 'react';
import styles from './GenresListPage.module.scss';
import { useStore } from '../../../context/storeContext';
import { observer } from 'mobx-react';
import GenresList from '../../../components/lists/genres/GenresList';

const GenresListPage = observer(() => {
  const genreStore = useStore('GenreStore');

  const fetchGenres = async (): Promise<void> => {
    await genreStore.fetchGenres();
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <main className={`${styles.genresPage} container page`}>
      <h2 className={`pageTitle`}>Genres</h2>
      {genreStore.getGenres().length > 0 ? (
        <GenresList genres={genreStore.getGenres()} />
      ) : (
        <span className={styles.noAuthors}>Genres not found</span>
      )}
    </main>
  );
});

export default GenresListPage;
