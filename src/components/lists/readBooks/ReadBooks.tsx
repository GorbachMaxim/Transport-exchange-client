import React from 'react';
import styles from './ReadBooks.module.scss';
import { useStore } from '../../../context/storeContext';
import { observer } from 'mobx-react';
import BookCard from '../../cards/book/BookCard';

const ReadBooks = observer(() => {
  const userStore = useStore('UserStore');

  return (
    <div>
      {userStore.getUser()?.readBooks !== null ? (
        <ul className={styles.list}>
          {userStore.getUser()?.readBooks.map((book) => (
            <li key={book.id}>
              <BookCard book={book} />
            </li>
          ))}
        </ul>
      ) : (
        <div>There are no books</div>
      )}
    </div>
  );
});

export default ReadBooks;
