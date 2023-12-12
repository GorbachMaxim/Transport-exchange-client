import React, { useState } from 'react';
import styles from './ReviewForm.module.scss';
import Form from '../../form/Form';
import { TextArea } from '../../ui/textArea/TextArea';
import Button from '../../ui/button/Button';
import { ReactComponent as StarIcon } from '../../../assets/icons/star-icon.svg';
import Review, { CommentCreateData } from '../../../core/types/review';

interface ReviewFormProps {
  onSubmit: (review: CommentCreateData) => void;
}

const ReviewForm = (props: ReviewFormProps) => {
  const [text, setText] = useState<string>('');
  const [mark, setMark] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);

  const rate = (score: number) => {
    setMark(score);
  };

  const onSubmit = async () => {
    if (mark === 0) {
      setIsError(true);
      return;
    }

    const review: CommentCreateData = {
      mark,
      text,
    };
    props.onSubmit(review);
    setText('');
    setMark(0);
    setIsError(false);
  };

  return (
    <Form className={styles.form}>
      <div className={styles.head}>
        <h4>Ваш отзыв</h4>
        <div className={styles.yourScore}>
          {[...new Array(5)].map((_, index) => (
            <StarIcon
              className={`${styles.starIcon} ${
                index > 4 - mark ? styles.activeStar : ''
              }`}
              onClick={() => rate(4 - index + 1)}
              key={index}
            />
          ))}
        </div>
      </div>
      <TextArea value={text} className={styles.textArea} onChange={setText} />
      <div className={styles.error}>
        {isError && <span>Вы должны оценить компанию!</span>}
      </div>
      <Button className={styles.button} onClick={onSubmit} type={'primary'}>
        Отравить обзор
      </Button>
    </Form>
  );
};

export default ReviewForm;
