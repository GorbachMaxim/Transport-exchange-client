import React, { useEffect, useState } from 'react';
import styles from './AuthorsListPage.module.scss';
import AuthorsList from '../../../components/lists/authors/AuthorsList';
import { useStore } from '../../../context/storeContext';
import { observer } from 'mobx-react';

const AuthorsListPage = observer(() => {
  const authorStore = useStore('AuthorStore');

  const fetchAuthors = async (): Promise<void> => {
    await authorStore.fetchAuthors();
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <main className={`${styles.authorsPage} container page`}>
      <h2 className={`pageTitle`}>Authors</h2>
      {authorStore.getAuthors().length > 0 ? (
        <AuthorsList authors={authorStore.getAuthors()} />
      ) : (
        <span className={styles.noAuthors}>Authors not found</span>
      )}
    </main>
  );
});

export default AuthorsListPage;
