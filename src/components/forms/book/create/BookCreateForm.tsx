import React, { useState } from 'react';
import styles from './BookCreateForm.module.scss';
import Input from '../../../ui/input/Input';
import { TextArea } from '../../../ui/textArea/TextArea';
import { ImageLoader } from '../../../ui/imageLoader/ImageLoader';
import Button from '../../../ui/button/Button';
import Form from '../../../form/Form';
import { BookCreateData } from '../../../../core/types/book';
import Author from '../../../../core/types/author';
import { useStore } from '../../../../context/storeContext';

interface BookCreateFormProps {
  onSubmit: (book: BookCreateData) => void;
}

const BookCreateForm = (props: BookCreateFormProps) => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [ISBN, setISBN] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = async () => {
    // const book: BookCreateData = {
    //   image,
    //   name,
    //   ISBN,
    //   author,
    //   genre: {
    //     id: 1,
    //     description: 'some text',
    //     image: '',
    //     name: 'name',
    //   },
    //   description,
    // };
    // props.onSubmit(book);
  };

  return (
    <Form>
      <ImageLoader onLoad={(newImage) => setImage(newImage || '')} />
      <Input type="text" placeholder="Name" onChange={setName} />
      <Input type="text" placeholder="ISBN" onChange={setISBN} />
      <Input type="text" placeholder="Author" onChange={() => {}} />
      <Input type="text" placeholder="Genre" onChange={() => {}} />
      <TextArea placeholder="Description" onChange={setDescription} />
      <Button type="primary" onClick={onSubmit}>
        Create
      </Button>
    </Form>
  );
};

export default BookCreateForm;
