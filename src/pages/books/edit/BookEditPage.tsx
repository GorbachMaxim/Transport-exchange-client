import React, { useEffect, useState } from 'react';
import styles from './BookEditPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { AUTHORS_ROUTE, BOOKS_ROUTE } from '../../../core/constants/routes';
import { useStore } from '../../../context/storeContext';
import Book from '../../../core/types/book';
import BookEditForm from '../../../components/forms/book/edit/BookEditForm';

const BookEditPage = () => {
  const [book, setBook] = useState<Book>(null!);
  const bookStore = useStore('BookStore');
  const { bookId } = useParams();
  const navigate = useNavigate();

  const updateBook = async (book: Book) => {
    const response = await bookStore.updateBook(book);

    if (response !== null) {
      navigate(BOOKS_ROUTE);
    }
  };

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
    <main className={`${styles.bookEditPage} container page`}>
      <h2 className={`pageTitle`}>Edit Author</h2>
      {book && <BookEditForm book={book} onSubmit={updateBook} />}
    </main>
  );
};

export default BookEditPage;
