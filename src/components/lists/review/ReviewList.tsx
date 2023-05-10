import React, { useEffect, useState } from 'react';
import styles from './ReviewList.module.scss';
import ReviewCard from '../../cards/review/ReviewCard';
import Review from '../../../core/types/review';
import api from '../../../core/api/api';
import { useStore } from '../../../context/storeContext';
import { observer } from 'mobx-react';

interface ReviewListProps {
  bookId: number;
}

const ReviewList = observer((props: ReviewListProps) => {
  const reviewStore = useStore('ReviewStore');

  const deleteReview = async (review: Review) => {
    await reviewStore.deleteReview(review.id);
    await reviewStore.fetchReviews(props.bookId);
  };

  const fetchReviews = async () => {
    await reviewStore.fetchReviews(props.bookId);
  };

  useEffect(() => {
    fetchReviews();
  }, [reviewStore]);

  return (
    <div className={styles.list}>
      {reviewStore.getReviews() !== null ? (
        reviewStore
          .getReviews()
          .map((review) => (
            <ReviewCard
              review={review}
              key={review.id}
              onDelete={deleteReview}
            />
          ))
          .reverse()
      ) : (
        <div>There are no reviews yet</div>
      )}
    </div>
  );
});

export default ReviewList;
