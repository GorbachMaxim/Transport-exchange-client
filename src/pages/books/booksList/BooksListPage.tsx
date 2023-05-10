import React, { FC, useEffect } from 'react';
import styles from './BooksListPage.module.scss';
import { useStore } from '../../../context/storeContext';
import BooksList from '../../../components/lists/books/BooksList';
import { observer } from 'mobx-react';
import Loader from '../../../components/ui/loader/Loader';
import { useSearchParams } from 'react-router-dom';

const BooksListPage: FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const bookStore = useStore('BookStore');

  const fetchBooks = new Promise<void>(async (resolve) => {
    const search = searchParams.get('search');
    if (search !== null) {
      await bookStore.searchBooks(search);
    } else {
      await bookStore.fetchBooks();
    }
    resolve();
  });

  return (
    <main className={`${styles.booksPage} container page`}>
      <h2 className={`pageTitle`}>Books</h2>
      <Loader promise={fetchBooks} loaderClassName={styles.loader}>
        <BooksList />
      </Loader>
    </main>
  );
});

export default BooksListPage;
