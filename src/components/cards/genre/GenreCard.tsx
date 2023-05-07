import React from 'react';
import styles from './GenreCard.module.scss';
import Genre from '../../../core/types/genre';

interface GenreCardProps {
  genre: Genre;
}

const GenreCard = (props: GenreCardProps) => {
  return (
    <div>
      <img src={props.genre.image} alt="genre illustration" />
      <span>{props.genre.name}</span>
      <span>{props.genre.description}</span>
    </div>
  );
};

export default GenreCard;
