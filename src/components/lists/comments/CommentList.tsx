import React, { useEffect, useState } from 'react';
import styles from './CommentList.module.scss';
import ReviewCard from '../../cards/review/ReviewCard';
import Comment from '../../../core/types/comment';
import api from '../../../core/api/api';
import { useStore } from '../../../context/storeContext';
import { observer } from 'mobx-react';
import CommentCard from '../../cards/comment/CommentCard';

interface CommentListProps {
  offerId: number;
}

const CommentList = observer((props: CommentListProps) => {
  const commentStore = useStore('CommentStore');

  const deleteComment = async (comment: Comment) => {
    await commentStore.deleteComment(comment.id);
    await commentStore.fetchComments(props.offerId);
  };

  const fetchComments = async () => {
    await commentStore.fetchComments(props.offerId);
  };

  useEffect(() => {
    fetchComments();
  }, [commentStore]);

  return (
    <div className={styles.list}>
      {commentStore.getComments() !== null ? (
        commentStore
          .getComments()
          .map((comment) => (
            <CommentCard
              comment={comment}
              key={comment.id}
              onDelete={deleteComment}
            />
          ))
          .reverse()
      ) : (
        <div></div>
      )}
    </div>
  );
});

export default CommentList;
