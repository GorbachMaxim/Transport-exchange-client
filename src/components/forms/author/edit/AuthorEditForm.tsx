import React from 'react';
import styles from './AuthorEditForm.module.scss';
import Author from '../../../../core/types/author';
import Input from '../../../ui/input/Input';
import Button from '../../../ui/button/Button';
import { ImageLoader } from '../../../ui/imageLoader/ImageLoader';
import { TextArea } from '../../../ui/textArea/TextArea';

interface AuthorEditFormProps {
  author: Author;
  onSubmit: () => void;
}

const AuthorEditForm = (props: AuthorEditFormProps) => {
  return (
    <form className={styles.form}>
      <div className={styles.image}>
        <img src={props.author.image} alt="author" />
      </div>
      <Input
        value={props.author.name}
        type={'text'}
        onChange={() => {}}
        className={styles.input}
      />
      <Input
        value={props.author.surname}
        type={'text'}
        onChange={() => {}}
        className={styles.input}
      />
      <Input
        value={props.author.biography}
        type={'text'}
        onChange={() => {}}
        className={styles.input}
      />
      <TextArea
        value={props.author.biography}
        onChange={() => {}}
        className={styles.input}
      />
      <Button onClick={() => {}}>Update</Button>
    </form>
  );
};

export default AuthorEditForm;
