import React, { useState } from 'react';
import styles from './AuthorEditForm.module.scss';
import Author from '../../../../core/types/author';
import Input from '../../../ui/input/Input';
import Button from '../../../ui/button/Button';
import preventDefaultSubmit from '../../../../core/utils/preventDefaultSubmit';
import { TextArea } from '../../../ui/textArea/TextArea';
import Form from '../../../form/Form';

interface AuthorEditFormProps {
  author: Author;
  onSubmit: (author: Author) => void;
}

const AuthorEditForm = (props: AuthorEditFormProps) => {
  const [image, setImage] = useState<string>(props.author.image);
  const [name, setName] = useState<string>(props.author.name);
  const [surname, setSurname] = useState<string>(props.author.surname);
  const [biography, setBiography] = useState<string>(props.author.biography);

  const onSubmit = async () => {
    const author: Author = {
      id: props.author.id,
      image,
      name,
      surname,
      biography,
    };
    await props.onSubmit(author);
  };

  return (
    <Form>
      <div className={styles.image}>
        <img src={props.author.image} alt="author" />
      </div>
      <Input
        value={name}
        type={'text'}
        onChange={setName}
        className={styles.input}
      />
      <Input
        value={surname}
        type={'text'}
        onChange={setSurname}
        className={styles.input}
      />
      <TextArea
        value={biography}
        onChange={setBiography}
        className={styles.input}
      />
      <Button type="primary" onClick={onSubmit}>
        Update
      </Button>
    </Form>
  );
};

export default AuthorEditForm;
