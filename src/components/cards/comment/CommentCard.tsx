import React from 'react';
import styles from './CommentCard.module.scss';
import Comment from '../../../core/types/comment';
import { ReactComponent as StarIcon } from '../../../assets/icons/star-icon.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete-icon.svg';
import { observer } from 'mobx-react';
import { useStore } from '../../../context/storeContext';
import AvailableFor from '../../availableFor/AvailableFor';

interface CommentCardProps {
  comment: Comment;
  onDelete: (comment: Comment) => void;
}

const CommentCard = observer((props: CommentCardProps) => {
  const userStore = useStore('UserStore');

  const deleteComment = async () => {
    props.onDelete(props.comment);
  };

  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <span>{props.comment.user.username}</span>
      </div>
      <p className={styles.text}>{props.comment.text}</p>
      {userStore.getUser()?.username === props.comment.user.username ? (
        <DeleteIcon className={styles.deleteIcon} onClick={deleteComment} />
      ) : (
        <AvailableFor roles={['ROLE_ADMIN']}>
          <DeleteIcon className={styles.deleteIcon} onClick={deleteComment} />
        </AvailableFor>
      )}
    </div>
  );
});

export default CommentCard;
