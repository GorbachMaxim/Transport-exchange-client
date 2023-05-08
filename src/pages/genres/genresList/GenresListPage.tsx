import React, { useEffect } from 'react';
import styles from './GenresListPage.module.scss';
import { useStore } from '../../../context/storeContext';
import { observer } from 'mobx-react';
import GenresList from '../../../components/lists/genres/GenresList';
import Loader from '../../../components/ui/loader/Loader';

const GenresListPage = observer(() => {
  const genreStore = useStore('GenreStore');

  const fetchGenres = new Promise<void>(async (resolve) => {
    await genreStore.fetchGenres();
    resolve();
  });

  return (
    <main className={`${styles.genresPage} container page`}>
      <h2 className={`pageTitle`}>Genres</h2>
      <Loader promise={fetchGenres} loaderClassName={styles.loader}>
        <GenresList />
      </Loader>
    </main>
  );
});

export default GenresListPage;
