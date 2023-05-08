import React, { useEffect, useState } from 'react';
import styles from './AuthorsListPage.module.scss';
import AuthorsList from '../../../components/lists/authors/AuthorsList';
import { useStore } from '../../../context/storeContext';
import { observer } from 'mobx-react';
import Loader from '../../../components/ui/loader/Loader';

const AuthorsListPage = observer(() => {
  const authorStore = useStore('AuthorStore');

  const fetchAuthors = new Promise<void>(async (resolve) => {
    await authorStore.fetchAuthors();
    resolve();
  });

  return (
    <main className={`${styles.authorsPage} container page`}>
      <div>
        <h2 className={`pageTitle`}>Authors</h2>
        <Loader promise={fetchAuthors} loaderClassName={styles.loader}>
          <AuthorsList />
        </Loader>
      </div>
    </main>
  );
});

export default AuthorsListPage;
