import React from 'react';
import styles from './ReviewCard.module.scss';
import Review from '../../../core/types/review';
import { ReactComponent as StarIcon } from '../../../assets/icons/star-icon.svg';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = (props: ReviewCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <span>{props.review.user.username}</span>
        <div>
          {[...new Array(5)].map((_, index) => (
            <StarIcon
              className={`${styles.starIcon} ${
                index < props.review.mark ? styles.activeStar : ''
              }`}
              key={index}
            />
          ))}
        </div>
      </div>
      <p className={styles.text}>{props.review.text}</p>
    </div>
  );
};

export default ReviewCard;
