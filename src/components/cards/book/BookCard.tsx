import React from 'react';
import styles from './BookCard.module.scss';
import Book from '../../../core/types/book';

interface BookCardProps {
  book: Book;
}

const BookCard = (props: BookCardProps) => {
  return (
    <div className={styles.bookCard}>
      <div className={styles.image}>
        <img src={props.book.image} alt="book cover" />
      </div>
      <span className={styles.name}>{props.book.name}</span>
      <span className={styles.author}>
        {`${props.book.author.name} ${props.book.author.surname}`}
      </span>
    </div>
  );
};

export default BookCard;
