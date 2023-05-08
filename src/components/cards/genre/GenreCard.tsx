import React from 'react';
import styles from './GenreCard.module.scss';
import Genre from '../../../core/types/genre';
import cutStringToLength from '../../../core/utils/cutStringToLength';
import { GENRES_ROUTE } from '../../../core/constants/routes';
import { useNavigate } from 'react-router-dom';

interface GenreCardProps {
  genre: Genre;
}

const GenreCard = (props: GenreCardProps) => {
  const navigate = useNavigate();
  const textLen = 270;

  return (
    <div className={styles.genreCard}>
      <div className={styles.image}>
        <img src={props.genre.image} alt="genre illustration" />
      </div>
      <div className={styles.text}>
        <h3 className={styles.name}>{props.genre.name}</h3>
        <p className={styles.description}>
          {cutStringToLength(props.genre.description, textLen)}...
          <span
            className={styles.viewMore}
            onClick={() => navigate(`${GENRES_ROUTE}/${props.genre.id}`)}
          >
            View more
          </span>
        </p>
      </div>
    </div>
  );
};

export default GenreCard;
