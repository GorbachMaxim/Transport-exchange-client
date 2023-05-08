import React from 'react';
import styles from './AuthorsList.module.scss';
import Author from '../../../core/types/author';
import AuthorCard from '../../cards/author/AuthorCard';
import { observer } from 'mobx-react';
import { useStore } from '../../../context/storeContext';
import GenreCard from '../../cards/genre/GenreCard';

const AuthorsList = observer(() => {
  const authorStore = useStore('AuthorStore');

  return (
    <ul className={styles.list}>
      {authorStore.getAuthors().length > 0 ? (
        authorStore
          .getAuthors()
          .map((author) => <AuthorCard author={author} key={author.id} />)
      ) : (
        <div>There are no authors</div>
      )}
    </ul>
  );
});

export default AuthorsList;
