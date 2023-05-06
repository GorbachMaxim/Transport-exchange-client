import React, { useState } from 'react';
import styles from './AuthorCreateFrom.module.scss';
import Input from '../../../ui/input/Input';
import { TextArea } from '../../../ui/textArea/TextArea';
import { ImageLoader } from '../../../ui/imageLoader/ImageLoader';
import Button from '../../../ui/button/Button';
import Form from '../../../form/Form';
import Author, { AuthorCreateData } from '../../../../core/types/author';

interface AuthorCreateFormProps {
  onSubmit: (author: AuthorCreateData) => void;
}

const AuthorCreateForm = (props: AuthorCreateFormProps) => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [biography, setBiography] = useState('');

  const onSubmit = () => {
    const author: AuthorCreateData = {
      image,
      name,
      surname,
      biography,
    };
    props.onSubmit(author);
  };

  return (
    <Form>
      <ImageLoader onLoad={(newImage) => setImage(newImage || '')} />
      <Input type="text" placeholder="Name" onChange={setName} />
      <Input type="text" placeholder="Surname" onChange={setSurname} />
      <TextArea placeholder="Biography" onChange={setBiography} />
      <Button type="primary" onClick={onSubmit}>
        Create
      </Button>
    </Form>
  );
};

export default AuthorCreateForm;
