import React from 'react';
import styles from './AuthorCreatePage.module.scss';
import AuthorCreateForm from '../../../components/forms/author/create/AuthorCreateForm';

const AuthorCreatePage = () => {
  return (
    <main className={`${styles.authorCreatePage} container page`}>
      <h2 className={`pageTitle`}>Create Author</h2>
      <AuthorCreateForm onSubmit={() => {}} />
    </main>
  );
};

export default AuthorCreatePage;
