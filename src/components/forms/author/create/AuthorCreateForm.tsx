import React from 'react';
import styles from './AuthorCreateFrom.module.scss';
import preventDefaultSubmit from '../../../../core/utils/preventDefaultSubmit';
import Input from '../../../ui/input/Input';
import { TextArea } from '../../../ui/textArea/TextArea';
import { ImageLoader } from '../../../ui/imageLoader/ImageLoader';
import Button from '../../../ui/button/Button';
import Form from '../../../form/Form';

interface AuthorCreateFormProps {
  onSubmit: () => void;
}

const AuthorCreateForm = (props: AuthorCreateFormProps) => {
  const onSubmit = () => {};

  return (
    <Form>
      <ImageLoader onLoad={() => {}} />
      <Input type="text" placeholder="Name" onChange={() => {}} />
      <Input type="text" placeholder="Surname" onChange={() => {}} />
      <TextArea placeholder="Biography" onChange={() => {}} />
      <Button type="primary" onClick={() => {}}>
        Create
      </Button>
    </Form>
  );
};

export default AuthorCreateForm;
