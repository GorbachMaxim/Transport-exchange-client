import React, { useEffect, useState } from 'react';
import styles from './Authors.module.scss';
import { useStore } from '../../../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import { AUTHORS_ROUTE } from '../../../../core/constants/routes';
import { observer } from 'mobx-react';
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete-icon.svg';
import { ReactComponent as ArrowIcon } from '../../../../assets/icons/arrow-icon.svg';
import Author from '../../../../core/types/author';

const Authors = observer(() => {
  const [isSorted, setIsSorted] = useState<boolean>(true);
  const authorStore = useStore('AuthorStore');
  const navigate = useNavigate();

  const arrowAnimation = () =>
    `${styles.arrow} ${isSorted ? styles.rotateUp : styles.rotateDown}`;

  const sortByField = (field: keyof Author) => {
    authorStore.sortByField(field);
    setIsSorted(!isSorted);
  };

  const fetchAuthors = async (): Promise<void> => {
    await authorStore.fetchAuthors();
  };

  const toEditPage = (authorId: number): void => {
    navigate(`${AUTHORS_ROUTE}/edit/${authorId}`);
  };

  const deleteAuthor = async (authorId: number): Promise<void> => {
    await authorStore.deleteAuthor(authorId);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <section className={styles.authors}>
      <h2 className={`accountPageTitle`}>Authors</h2>
      <ul className={styles.authorsList}>
        <li className={styles.headers}>
          <div className={styles.indexHeader}>
            <span>#</span>
          </div>
          <div className={styles.nameHeader}>
            <span>name</span>
            <button
              className={styles.arrowBtn}
              onClick={() => sortByField('name')}
            >
              <ArrowIcon className={arrowAnimation()} />
            </button>
          </div>
          <div className={styles.idHeader}>
            <span>ID</span>
            <button
              className={styles.arrowBtn}
              onClick={() => sortByField('id')}
            >
              <ArrowIcon className={arrowAnimation()} />
            </button>
          </div>
        </li>
        {authorStore.getAuthors().length > 0 ? (
          authorStore.getAuthors().map((author, index) => (
            <li className={styles.authorItem} key={author.id}>
              <span className={styles.authorIndex}>{index + 1}</span>
              <span
                className={styles.authorName}
              >{`${author.name} ${author.surname}`}</span>
              <span className={styles.authorId}>{author.id}</span>
              <button
                className={styles.editBtn}
                onClick={() => toEditPage(author.id)}
              >
                <EditIcon />
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => deleteAuthor(author.id)}
              >
                <DeleteIcon />
              </button>
            </li>
          ))
        ) : (
          <div>There are no authors</div>
        )}
      </ul>
    </section>
  );
});

export default Authors;
