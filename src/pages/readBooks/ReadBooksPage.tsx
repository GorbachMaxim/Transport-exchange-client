import React, { useEffect } from 'react';
import styles from './ReadBooksPage.module.scss';
import { useStore } from '../../context/storeContext';
import Loader from '../../components/ui/loader/Loader';
import ReadBooks from '../../components/lists/readBooks/ReadBooks';

const ReadBooksPage = () => {
  const userStore = useStore('UserStore');

  const fetchReadBooks = new Promise<void>(async (resolve) => {
    await userStore.fetchReadBooks();
    resolve();
  });

  return (
    <div className={`${styles.readBook} container page`}>
      <h2 className={'pageTitle'}>My read books</h2>
      <Loader promise={fetchReadBooks} loaderClassName={styles.loader}>
        <ReadBooks />
      </Loader>
    </div>
  );
};

export default ReadBooksPage;
