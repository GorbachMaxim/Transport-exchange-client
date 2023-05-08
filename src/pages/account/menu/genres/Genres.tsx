import React, { useEffect } from 'react';
import styles from './Genres.module.scss';
import { useStore } from '../../../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import { GENRES_ROUTE } from '../../../../core/constants/routes';
import { observer } from 'mobx-react';
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete-icon.svg';
import Button from '../../../../components/ui/button/Button';
import Genre from '../../../../core/types/genre';

const Genres = observer(() => {
  const genreStore = useStore('GenreStore');
  const navigate = useNavigate();

  const fetchGenres = async (): Promise<void> => {
    await genreStore.fetchGenres();
  };

  const toEditPage = (genreId: number): void => {
    navigate(`${GENRES_ROUTE}/edit/${genreId}`);
  };

  const toCreatePage = (): void => {
    navigate(`${GENRES_ROUTE}/create`);
  };

  const deleteGenre = async (genre: Genre): Promise<void> => {
    await genreStore.deleteGenre(genre);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <section className={styles.authors}>
      <h2 className={`accountPageTitle`}>Genres</h2>
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
        {genreStore.getGenres().length > 0 ? (
          genreStore.getGenres().map((genre, index) => (
            <li className={styles.authorItem} key={genre.id}>
              <span className={styles.authorIndex}>{index + 1}</span>
              <span className={styles.authorName}>{genre.name}</span>
              <span className={styles.authorId}>{genre.id}</span>
              <button
                className={styles.editBtn}
                onClick={() => toEditPage(genre.id)}
              >
                <EditIcon />
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => deleteGenre(genre)}
              >
                <DeleteIcon />
              </button>
            </li>
          ))
        ) : (
          <div>There are no genres</div>
        )}
      </ul>
    </section>
  );
});

export default Genres;
