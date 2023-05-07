import React, { FC, useEffect } from 'react';
import styles from './BooksListPage.module.scss';
import { useStore } from '../../../context/storeContext';
import BooksList from '../../../components/lists/books/BooksList';
import { observer } from 'mobx-react';

const BooksListPage: FC = observer(() => {
  const bookStore = useStore('BookStore');

  const fetchBooks = async () => {
    await bookStore.fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <main className={`${styles.booksPage} container page`}>
      <h2 className={`pageTitle`}>Authors</h2>
      {bookStore.getBooks().length > 0 ? (
        <BooksList books={bookStore.getBooks()} />
      ) : (
        <span className={styles.noAuthors}>Books not found</span>
      )}
    </main>
  );
});

export default BooksListPage;
