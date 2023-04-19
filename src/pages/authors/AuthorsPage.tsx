import React, { useEffect, useState } from 'react';
import styles from './AuthorsPage.module.scss';
import api from '../../core/api/api';
import AuthorsList from '../../components/lists/authors/AuthorsList';
import Author from '../../core/types/author';

const AuthorsPage = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  const fetchAuthors = async (): Promise<void> => {
    const authors = await api.fetchAuthors();
    setAuthors(authors);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <main className={`${styles.authorsPage} container`}>
      Authors
      <AuthorsList authors={authors} />
    </main>
  );
};

export default AuthorsPage;