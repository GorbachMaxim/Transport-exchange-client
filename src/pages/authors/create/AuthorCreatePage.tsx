import React from 'react';
import styles from './AuthorCreatePage.module.scss';
import AuthorCreateForm from '../../../components/forms/author/create/AuthorCreateForm';

const AuthorCreatePage = () => {
  return (
    <main className={`${styles.authorEditPage} container page`}>
      <h2 className={`pageTitle`}>Edit Author</h2>
      <AuthorCreateForm onSubmit={() => {}} />
    </main>
  );
};

export default AuthorCreatePage;
