import React from 'react';
import styles from './AuthorCreatePage.module.scss';
import AuthorCreateForm from '../../../components/forms/author/create/AuthorCreateForm';
import Author, { AuthorCreateData } from '../../../core/types/author';
import { useStore } from '../../../context/storeContext';

const AuthorCreatePage = () => {
  const authorStore = useStore('AuthorStore');

  const onSubmit = async (author: AuthorCreateData) => {
    await authorStore.createAuthor(author as Author);
  };

  return (
    <main className={`${styles.authorCreatePage} container page`}>
      <h2 className={`pageTitle`}>Create Author</h2>
      <AuthorCreateForm onSubmit={onSubmit} />
    </main>
  );
};

export default AuthorCreatePage;
