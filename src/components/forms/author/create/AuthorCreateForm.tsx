import React from 'react';
import styles from './AuthorCreateFrom.module.scss';
import preventDefaultSubmit from '../../../../core/utils/preventDefaultSubmit';
import Input from '../../../ui/input/Input';
import { TextArea } from '../../../ui/textArea/TextArea';
import { ImageLoader } from '../../../ui/imageLoader/ImageLoader';
import Button from '../../../ui/button/Button';

interface AuthorCreateFormProps {
  onSubmit: () => void;
}

const AuthorCreateForm = (props: AuthorCreateFormProps) => {
  return (
    <form className={`form`} onSubmit={preventDefaultSubmit}>
      <ImageLoader onLoad={() => {}} />
      <Input type="text" placeholder="Name" onChange={() => {}} />
      <Input type="text" placeholder="Surname" onChange={() => {}} />
      <TextArea placeholder="Biography" onChange={() => {}} />
      <Button type="primary" onClick={() => {}}>
        Create
      </Button>
    </form>
  );
};

export default AuthorCreateForm;
