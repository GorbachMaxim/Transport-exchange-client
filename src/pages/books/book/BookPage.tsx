import React, { useEffect, useState } from 'react';
import styles from './BookPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../../../context/storeContext';
import Book from '../../../core/types/book';
import { BOOKS_ROUTE, READBOOKS_ROUTE } from '../../../core/constants/routes';
import ReviewList from '../../../components/lists/review/ReviewList';
import Button from '../../../components/ui/button/Button';
import { ReactComponent as StarSvg } from '../../../assets/icons/star-icon.svg';

const BookPage = observer(() => {
  const [book, setBook] = useState<Book>(null!);
  const bookStore = useStore('BookStore');
  const userStore = useStore('UserStore');
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

  const fetchBook = async () => {
    const receivedBook = await bookStore.fetchBookById(Number(bookId));

    if (receivedBook) {
      setBook(receivedBook);
    } else {
      navigate(BOOKS_ROUTE);
    }
  };

  const rate = (mark: number) => {
    console.log(mark);
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
                <StarSvg className={styles.starIcon} onClick={() => rate(5)} />
                <StarSvg className={styles.starIcon} onClick={() => rate(4)} />
                <StarSvg className={styles.starIcon} onClick={() => rate(3)} />
                <StarSvg className={styles.starIcon} onClick={() => rate(2)} />
                <StarSvg className={styles.starIcon} onClick={() => rate(1)} />
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
            <h2 className={styles.name}>{book.name}</h2>
            <p>{book.description}</p>
          </div>
          <div className={styles.review}>
            <ReviewList reviews={book.reviews} />
          </div>
        </div>
      )}
    </div>
  );
});

export default BookPage;
