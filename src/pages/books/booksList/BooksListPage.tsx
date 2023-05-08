import React, { FC, useEffect } from 'react';
import styles from './BooksListPage.module.scss';
import { useStore } from '../../../context/storeContext';
import BooksList from '../../../components/lists/books/BooksList';
import { observer } from 'mobx-react';
import Loader from '../../../components/ui/loader/Loader';

const BooksListPage: FC = observer(() => {
  const bookStore = useStore('BookStore');

  const fetchBooks = new Promise<void>(async (resolve) => {
    await bookStore.fetchBooks();
    resolve();
  });

  return (
    <main className={`${styles.booksPage} container page`}>
      <h2 className={`pageTitle`}>Authors</h2>
      <Loader promise={fetchBooks} loaderClassName={styles.loader}>
        <BooksList />
      </Loader>
    </main>
  );
});

export default BooksListPage;
