import React, { useEffect, lazy } from 'react';
import styles from './GenresList.module.scss';
import Genre from '../../../core/types/genre';
import GenreCard from '../../cards/genre/GenreCard';

interface GenresListProps {
  genres: Genre[];
}

const GenresList = (props: GenresListProps) => {
  return (
    <div className={styles.list}>
      {props.genres.map((genre) => (
        <GenreCard genre={genre} key={genre.id} />
      ))}
    </div>
  );
};

export default GenresList;
