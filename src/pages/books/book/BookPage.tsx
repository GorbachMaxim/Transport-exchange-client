import React, { useEffect, useState } from 'react';
import styles from './BookPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../../../context/storeContext';
import Book from '../../../core/types/book';
import {
  ACCOUNT_ROUTE,
  BOOKS_ROUTE,
  READBOOKS_ROUTE,
} from '../../../core/constants/routes';
import ReviewList from '../../../components/lists/review/ReviewList';
import Button from '../../../components/ui/button/Button';
import { ReactComponent as StarIcon } from '../../../assets/icons/star-icon.svg';
import ReviewForm from '../../../components/forms/review/ReviewForm';
import Review, { ReviewCreateData } from '../../../core/types/review';
import { Link } from 'react-router-dom';

const BookPage = observer(() => {
  const [book, setBook] = useState<Book>(null!);
  const bookStore = useStore('BookStore');
  const userStore = useStore('UserStore');
  const reviewStore = useStore('ReviewStore');
  const { bookId } = useParams();
  const navigate = useNavigate();

  const addReadBook = async () => {
    await userStore.addReadBook(book);
    navigate(READBOOKS_ROUTE);
  };

  const removeReadBook = async () => {
    await userStore.removeReadBook(book);
    navigate(READBOOKS_ROUTE);
  };

  const sendReview = async (review: ReviewCreateData) => {
    if (userStore.getUser() !== null) {
      await reviewStore.addReview(book, review as Review);
      await reviewStore.fetchReviews(book.id);
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
    <div className={`${styles.bookPage} container page`}>
      {book && (
        <div className={styles.content}>
          <div className={styles.sidePanel}>
            <div className={styles.image}>
              <img src={book.image} alt="book cover" />
            </div>
            <div className={styles.rating}>
              {book.avgScore > 0 ? (
                <span className={styles.avgScore}>Rating: {book.avgScore}</span>
              ) : (
                <span className={styles.avgScore}>No ratings yet</span>
              )}
              <div className={styles.yourScore}>
                {[...new Array(5)].map((_, index) => (
                  <StarIcon
                    className={`${styles.starIcon} ${
                      index < Math.floor(book.avgScore) ? styles.activeStar : ''
                    }`}
                    key={index}
                  />
                ))}
              </div>
            </div>
            {userStore
              .getUser()
              ?.readBooks?.some((readBook) => readBook.id === book.id) ? (
              <Button onClick={removeReadBook} type={'primary'}>
                Remove from read books
              </Button>
            ) : (
              <Button onClick={addReadBook} type={'primary'}>
                Add to read books
              </Button>
            )}
          </div>
          <div className={styles.text}>
            <div>
              <h2 className={styles.name}>{book.name}</h2>
              <p className={styles.description}>{book.description}</p>
            </div>
            <div className={styles.review}>
              <h2>Reviews</h2>
              {userStore.getUser()?.verified ? (
                <ReviewForm onSubmit={sendReview} />
              ) : (
                <div className={styles.notVerified}>
                  You must verify your account to post reviews.
                  <Link
                    to={`${ACCOUNT_ROUTE}/overview`}
                    className={styles.verifyLink}
                  >
                    Click here to verify
                  </Link>
                </div>
              )}
              <ReviewList bookId={book.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default BookPage;
