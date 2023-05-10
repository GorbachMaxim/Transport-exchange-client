import React from 'react';
import styles from './BooksList.module.scss';
import Book from '../../../core/types/book';
import BookCard from '../../cards/book/BookCard';
import { useStore } from '../../../context/storeContext';
import { observer } from 'mobx-react';

const BooksList = observer(() => {
  const bookStore = useStore('BookStore');

  return (
    <ul className={styles.list}>
      {bookStore.getBooks().length > 0 ? (
        bookStore
          .getBooks()
          .map((book) => <BookCard book={book} key={book.id} />)
      ) : (
        <div>There are no books</div>
      )}
    </ul>
  );
});

export default BooksList;
