import React from 'react';
import styles from './BooksList.module.scss';
import Book from '../../../core/types/book';
import BookCard from '../../cards/book/BookCard';

interface BooksListProps {
  books: Book[];
}

const BooksList = (props: BooksListProps) => {
  return (
    <ul className={styles.list}>
      {props.books.map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
    </ul>
  );
};

export default BooksList;
