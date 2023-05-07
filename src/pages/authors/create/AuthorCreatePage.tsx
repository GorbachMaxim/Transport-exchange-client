import React from 'react';
import styles from './AuthorCreatePage.module.scss';
import AuthorCreateForm from '../../../components/forms/author/create/AuthorCreateForm';
import Author, { AuthorCreateData } from '../../../core/types/author';
import { useStore } from '../../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import { AUTHORS_ROUTE } from '../../../core/constants/routes';

const AuthorCreatePage = () => {
  const authorStore = useStore('AuthorStore');
  const navigate = useNavigate();

  const onSubmit = async (author: AuthorCreateData) => {
    await authorStore.createAuthor(author as Author);
    navigate(`${AUTHORS_ROUTE}`);
  };

  return (
    <main className={`${styles.authorCreatePage} container page`}>
      <h2 className={`pageTitle`}>Create Author</h2>
      <AuthorCreateForm onSubmit={onSubmit} />
    </main>
  );
};

export default AuthorCreatePage;
