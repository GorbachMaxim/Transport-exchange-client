import React from 'react';
import styles from './BookCreatePage.module.scss';
import { useStore } from '../../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import { BOOKS_ROUTE } from '../../../core/constants/routes';
import { BookCreateData } from '../../../core/types/book';
import BookCreateForm from '../../../components/forms/book/create/BookCreateForm';

const BookCreatePage = () => {
  const bookStore = useStore('BookStore');
  const navigate = useNavigate();

  const onSubmit = async (book: BookCreateData): Promise<void> => {
    await bookStore.createBook(book);
    navigate(BOOKS_ROUTE);
  };

  return (
    <main className={`${styles.bookCreatePage} container page`}>
      <h2 className={`pageTitle`}>Create Book</h2>
      <BookCreateForm onSubmit={onSubmit} />
    </main>
  );
};

export default BookCreatePage;
