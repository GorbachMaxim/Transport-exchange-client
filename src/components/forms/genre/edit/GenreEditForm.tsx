import React, { useState } from 'react';
import styles from './GenreEditForm.module.scss';
import Input from '../../../ui/input/Input';
import Button from '../../../ui/button/Button';
import { TextArea } from '../../../ui/textArea/TextArea';
import Form from '../../../form/Form';
import ImageEditor from '../../../imageEditor/ImageEditor';
import Genre from '../../../../core/types/genre';

interface GenreEditFormProps {
  genre: Genre;
  onSubmit: (genre: Genre) => void;
}

const GenreEditForm = (props: GenreEditFormProps) => {
  const [image, setImage] = useState<string>(props.genre.image);
  const [name, setName] = useState<string>(props.genre.name);
  const [description, setDescription] = useState<string>(
    props.genre.description,
  );

  const onSubmit = async () => {
    const genre: Genre = {
      id: props.genre.id,
      image,
      name,
      description,
    };
    await props.onSubmit(genre);
  };

  return (
    <Form>
      <div className={styles.image}>
        <img src={image} alt="genre illustration" />
        <ImageEditor
          onLoad={(newImage) => setImage(newImage || '')}
          className={styles.imageLoader}
        />
      </div>
      <Input
        value={name}
        type={'text'}
        onChange={setName}
        className={styles.input}
        placeholder={'Name'}
      />
      <TextArea
        value={description}
        onChange={setDescription}
        className={styles.input}
        placeholder={'Description'}
      />
      <Button type="primary" onClick={onSubmit}>
        Update
      </Button>
    </Form>
  );
};

export default GenreEditForm;
