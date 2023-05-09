import React from 'react';
import styles from './ReviewList.module.scss';
import ReviewCard from '../../cards/review/ReviewCard';
import Review from '../../../core/types/review';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList = (props: ReviewListProps) => {
  return (
    <div>
      {props.reviews.map((review) => (
        <ReviewCard review={review} key={review.id} />
      ))}
    </div>
  );
};

export default ReviewList;
