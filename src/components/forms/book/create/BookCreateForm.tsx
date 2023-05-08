import React, { useEffect, useState } from 'react';
import styles from './BookCreateForm.module.scss';
import Input from '../../../ui/input/Input';
import { TextArea } from '../../../ui/textArea/TextArea';
import { ImageLoader } from '../../../ui/imageLoader/ImageLoader';
import Button from '../../../ui/button/Button';
import Form from '../../../form/Form';
import Book, { BookCreateData } from '../../../../core/types/book';
import Author from '../../../../core/types/author';
import { useStore } from '../../../../context/storeContext';
import Select from '../../../ui/select/Select';
import Option from '../../../../core/types/option';
import Genre from '../../../../core/types/genre';
import { observer } from 'mobx-react';

interface BookCreateFormProps {
  onSubmit: (book: BookCreateData) => void;
}

const BookCreateForm = observer((props: BookCreateFormProps) => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [ISBN, setISBN] = useState('');
  const [description, setDescription] = useState('');
  const [authorId, setAuthorId] = useState<number>(0);
  const [genreId, setGenreId] = useState<number>(0);
  const [authorOptions, setAuthorOptions] = useState<Option[]>([]);
  const [genreOptions, setGenreOptions] = useState<Option[]>([]);
  const authorStore = useStore('AuthorStore');
  const genreStore = useStore('GenreStore');

  const setAuthorByOption = (option: Option) => {
    setAuthorId(option.id);
  };
  const setGenreByOption = (option: Option) => {
    setGenreId(option.id);
  };

  const getAuthorById = (id: number) => {
    return authorStore.getAuthors().find((author) => author.id === id);
  };

  const getGenreById = (id: number) => {
    return genreStore.getGenres().find((genre) => genre.id === id);
  };

  const onSubmit = async () => {
    const book: Partial<BookCreateData> = {
      image,
      name,
      ISBN,
      author: getAuthorById(authorId),
      genre: getGenreById(genreId),
      description,
    };
    props.onSubmit(book as Book);
  };

  const fetchAuthors = async (): Promise<void> => {
    await authorStore.fetchAuthors();
  };

  const fetchGenres = async (): Promise<void> => {
    await genreStore.fetchGenres();
  };

  const setOptions = async (): Promise<void> => {
    await fetchGenres();
    await fetchAuthors();

    const filteredAuthorOptions = authorStore.getAuthors().map((author) => ({
      id: author.id,
      value: `${author.name} ${author.surname}`,
    }));

    const filteredGenreOptions = genreStore.getGenres().map((genre) => ({
      id: genre.id,
      value: genre.name,
    }));

    setAuthorOptions(filteredAuthorOptions);
    setGenreOptions(filteredGenreOptions);
  };

  useEffect(() => {
    setOptions();
  }, []);

  return (
    <Form>
      <ImageLoader onLoad={(newImage) => setImage(newImage || '')} />
      <Input type="text" placeholder="Name" onChange={setName} />
      <Input type="text" placeholder="ISBN" onChange={setISBN} />
      {authorOptions.length > 0 ? (
        <Select
          options={genreOptions}
          onChange={setGenreByOption}
          caption={'Genre'}
        />
      ) : (
        <div>Loading...</div>
      )}
      {authorOptions.length > 0 ? (
        <Select
          options={authorOptions}
          onChange={setAuthorByOption}
          caption={'Author'}
        />
      ) : (
        <div>Loading...</div>
      )}
      <TextArea placeholder="Description" onChange={setDescription} />
      <Button type="primary" onClick={onSubmit}>
        Create
      </Button>
    </Form>
  );
});

export default BookCreateForm;
