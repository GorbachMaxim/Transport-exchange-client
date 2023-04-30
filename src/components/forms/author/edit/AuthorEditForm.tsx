import React from 'react';
import styles from './AuthorEditForm.module.scss';
import Author from '../../../../core/types/author';
import Input from '../../../ui/input/Input';
import Button from '../../../ui/button/Button';
import { ImageLoader } from '../../../ui/imageLoader/ImageLoader';

interface AuthorEditFormProps {
  author: Author;
  onSubmit: () => void;
}

const AuthorEditForm = (props: AuthorEditFormProps) => {
  return (
    <form>
      <Input value={props.author.name} type={'text'} onChange={() => {}} />
      <Input value={props.author.surname} type={'text'} onChange={() => {}} />
      <Input value={props.author.biography} type={'text'} onChange={() => {}} />
      <Button onClick={() => {}}>Update</Button>
    </form>
  );
};

export default AuthorEditForm;
