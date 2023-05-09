import React from 'react';
import styles from './ReviewCard.module.scss';
import Review from '../../../core/types/review';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = (props: ReviewCardProps) => {
  return (
    <div>
      <span>{props.review.user.username}</span>
      <span>{props.review.mark}</span>
      <span>{props.review.text}</span>
    </div>
  );
};

export default ReviewCard;
