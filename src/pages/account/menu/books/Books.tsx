import React, { useEffect, useState } from 'react';
import styles from './Books.module.scss';
import { useStore } from '../../../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import { BOOKS_ROUTE } from '../../../../core/constants/routes';
import { observer } from 'mobx-react';
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete-icon.svg';
import Button from '../../../../components/ui/button/Button';
import Book from '../../../../core/types/book';

const Books = observer(() => {
  const bookStore = useStore('BookStore');
  const navigate = useNavigate();

  const fetchBooks = async (): Promise<void> => {
    await bookStore.fetchBooks();
  };

  const toEditPage = (authorId: number): void => {
    navigate(`${BOOKS_ROUTE}/edit/${authorId}`);
  };

  const toCreatePage = (): void => {
    navigate(`${BOOKS_ROUTE}/create`);
  };

  const deleteBook = async (book: Book): Promise<void> => {
    await bookStore.deleteBook(book);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <section className={styles.authors}>
      <h2 className={`accountPageTitle`}>Books</h2>
      <ul className={styles.authorsList}>
        <li className={styles.headers}>
          <div className={styles.indexHeader}>
            <span>#</span>
          </div>
          <div className={styles.nameHeader}>
            <span>name</span>
          </div>
          <div className={styles.idHeader}>
            <span>ID</span>
          </div>
          <div>
            <Button
              onClick={toCreatePage}
              type={'secondary'}
              className={styles.createBtn}
            >
              <span className={styles.plusBtn}>+</span>Create
            </Button>
          </div>
        </li>
        {bookStore.getBooks().length > 0 ? (
          bookStore.getBooks().map((book, index) => (
            <li className={styles.authorItem} key={book.id}>
              <span className={styles.authorIndex}>{index + 1}</span>
              <span className={styles.authorName}>{book.name}</span>
              <span className={styles.authorId}>{book.id}</span>
              <button
                className={styles.editBtn}
                onClick={() => toEditPage(book.id)}
              >
                <EditIcon />
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => deleteBook(book)}
              >
                <DeleteIcon />
              </button>
            </li>
          ))
        ) : (
          <div>There are no books</div>
        )}
      </ul>
    </section>
  );
});

export default Books;
