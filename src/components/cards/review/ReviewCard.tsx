import React from 'react';
import styles from './ReviewCard.module.scss';
import Review from '../../../core/types/review';
import { ReactComponent as StarIcon } from '../../../assets/icons/star-icon.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete-icon.svg';
import { observer } from 'mobx-react';
import { useStore } from '../../../context/storeContext';
import AvailableFor from '../../availableFor/AvailableFor';

interface ReviewCardProps {
  review: Review;
  onDelete: (review: Review) => void;
}

const ReviewCard = observer((props: ReviewCardProps) => {
  const userStore = useStore('UserStore');

  const deleteReview = async () => {
    props.onDelete(props.review);
  };

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
      {userStore.getUser()?.username === props.review.user.username ? (
        <DeleteIcon className={styles.deleteIcon} onClick={deleteReview} />
      ) : (
        <AvailableFor roles={['ROLE_ADMIN']}>
          <DeleteIcon className={styles.deleteIcon} onClick={deleteReview} />
        </AvailableFor>
      )}
    </div>
  );
});

export default ReviewCard;
