import React from 'react';
import styles from './BookCard.module.scss';
import Book from '../../../core/types/book';
import { BOOKS_ROUTE } from '../../../core/constants/routes';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as StarIcon } from '../../../assets/icons/star-icon.svg';

interface BookCardProps {
  book: Book;
  className?: string;
}

const BookCard = (props: BookCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.bookCard} ${props.className || ''}`}
      onClick={() => navigate(`${BOOKS_ROUTE}/${props.book.id}`)}
    >
      <div className={styles.image}>
        <img src={props.book.image} alt="book cover" />
        <div className={styles.yourScore}>
          {[...new Array(5)].map((_, index) => (
            <StarIcon
              className={`${styles.starIcon} ${
                index < Math.floor(props.book.avgScore) ? styles.activeStar : ''
              }`}
              key={index}
            />
          ))}
        </div>
      </div>
      <span className={styles.name}>{props.book.name}</span>
      <span className={styles.author}>
        {`${props.book.author.name} ${props.book.author.surname}`}
      </span>
    </div>
  );
};

export default BookCard;
