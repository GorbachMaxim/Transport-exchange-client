import React, { useState } from 'react';
import styles from './CommentForm.module.scss';
import Form from '../../form/Form';
import { TextArea } from '../../ui/textArea/TextArea';
import Button from '../../ui/button/Button';
import Comment, { CommentCreateData } from '../../../core/types/comment';

interface CommentFormProps {
  onSubmit: (comment: CommentCreateData) => void;
}

const CommentForm = (props: CommentFormProps) => {
  const [text, setText] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const onSubmit = async () => {
    if (text === '') {
      setIsError(true);
      return;
    }

    const comment: CommentCreateData = {
      text,
    };
    props.onSubmit(comment);
    setText('');
    setIsError(false);
  };

  return (
    <Form className={styles.form}>
      <div className={styles.head}>
        <h4>Ваш отклик</h4>
      </div>
      <TextArea value={text} className={styles.textArea} onChange={setText} />
      <div className={styles.error}>
        {isError && <span>Заполните отклик!</span>}
      </div>
      <Button className={styles.button} onClick={onSubmit} type={'primary'}>
        Отравить отклик
      </Button>
    </Form>
  );
};

export default CommentForm;
