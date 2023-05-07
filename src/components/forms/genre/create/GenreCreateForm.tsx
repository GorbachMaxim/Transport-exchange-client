import React, { useState } from 'react';
import styles from './GenreCreateForm.module.scss';
import Input from '../../../ui/input/Input';
import { TextArea } from '../../../ui/textArea/TextArea';
import { ImageLoader } from '../../../ui/imageLoader/ImageLoader';
import Button from '../../../ui/button/Button';
import Form from '../../../form/Form';
import Genre, { GenreCreateData } from '../../../../core/types/genre';

interface GenreCreateFormProps {
  onSubmit: (genre: GenreCreateData) => void;
}

const GenreCreateForm = (props: GenreCreateFormProps) => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = async () => {
    const genre: GenreCreateData = {
      image,
      name,
      description,
    };
    props.onSubmit(genre);
  };

  return (
    <Form>
      <ImageLoader onLoad={(newImage) => setImage(newImage || '')} />
      <Input type="text" placeholder="Name" onChange={setName} />
      <TextArea placeholder="Description" onChange={setDescription} />
      <Button type="primary" onClick={onSubmit}>
        Create
      </Button>
    </Form>
  );
};

export default GenreCreateForm;
