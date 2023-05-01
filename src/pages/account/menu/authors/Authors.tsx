import React, { useEffect } from 'react';
import styles from './Authors.module.scss';
import { useStore } from '../../../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import { AUTHORS_ROUTE } from '../../../../core/constants/routes';
import { observer } from 'mobx-react';
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete-icon.svg';

const Authors = observer(() => {
  const authorStore = useStore('AuthorStore');
  const navigate = useNavigate();

  const fetchAuthors = async (): Promise<void> => {
    await authorStore.fetchAuthors();
  };

  const toEditPage = (authorId: number) => {
    navigate(`${AUTHORS_ROUTE}/edit/${authorId}`);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <section className={styles.authors}>
      <h2 className={`accountPageTitle`}>Authors</h2>
      <ul className={styles.authorsList}>
        <li className={styles.headers}>
          <span className={styles.indexHeader}>#</span>
          <span className={styles.nameHeader}>name</span>
          <span className={styles.idHeader}>ID</span>
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
              <button className={styles.deleteBtn}>
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
