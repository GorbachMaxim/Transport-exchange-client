import React, { useEffect, useState } from 'react';
import styles from './BookPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../../../context/storeContext';
import Book from '../../../core/types/book';
import { BOOKS_ROUTE } from '../../../core/constants/routes';

const BookPage = observer(() => {
  const [book, setBook] = useState<Book>(null!);
  const bookStore = useStore('BookStore');
  const { bookId } = useParams();
  const navigate = useNavigate();

  const fetchBook = async () => {
    const receivedBook = await bookStore.fetchBookById(Number(bookId));
    if (receivedBook) {
      setBook(receivedBook);
    } else {
      navigate(BOOKS_ROUTE);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <div className={`${styles.bookPage} container page`}>
      {book && (
        <div className={styles.content}>
          <div className={styles.image}>
            <img src={book.image} alt="book cover" />
          </div>
          <div className={styles.text}>
            <h2 className={styles.name}>{book.name}</h2>
            <p>{book.description}</p>
          </div>
        </div>
      )}
    </div>
  );
});

export default BookPage;
