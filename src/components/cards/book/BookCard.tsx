import React from 'react';
import styles from './BookCard.module.scss';
import Book from '../../../core/types/book';
import { BOOKS_ROUTE } from '../../../core/constants/routes';
import { useNavigate } from 'react-router-dom';

interface BookCardProps {
  book: Book;
}

const BookCard = (props: BookCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.bookCard}
      onClick={() => navigate(`${BOOKS_ROUTE}/${props.book.id}`)}
    >
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
