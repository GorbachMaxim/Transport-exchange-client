import React, { useEffect, useState } from 'react';
import styles from './BookEditForm.module.scss';
import Input from '../../../ui/input/Input';
import Button from '../../../ui/button/Button';
import { TextArea } from '../../../ui/textArea/TextArea';
import Form from '../../../form/Form';
import ImageEditor from '../../../imageEditor/ImageEditor';
import Book, { BookCreateData } from '../../../../core/types/book';
import Select from '../../../ui/select/Select';
import Option from '../../../../core/types/option';
import { useStore } from '../../../../context/storeContext';

interface BookEditFormProps {
  book: Book;
  onSubmit: (book: Book) => void;
}

const BookEditForm = (props: BookEditFormProps) => {
  const [image, setImage] = useState<string>(props.book.image);
  const [name, setName] = useState<string>(props.book.name);
  const [isbn, setIsbn] = useState<string>(props.book.isbn);
  const [description, setDescription] = useState<string>(
    props.book.description,
  );
  const [authorId, setAuthorId] = useState<number>(props.book.author.id);
  const [genreId, setGenreId] = useState<number>(props.book.genre.id);
  const [authorOptions, setAuthorOptions] = useState<Option[]>([]);
  const [genreOptions, setGenreOptions] = useState<Option[]>([]);
  const authorStore = useStore('AuthorStore');
  const genreStore = useStore('GenreStore');

  const getInitialAuthorOption = (): Option | undefined => {
    return authorOptions?.find((option) => option.id === props.book.author.id);
  };

  const getInitialGenreOption = (): Option | undefined => {
    return genreOptions?.find((option) => option.id === props.book.genre.id);
  };

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
    const book: Partial<Book> = {
      id: props.book.id,
      image,
      name,
      isbn,
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
      <div className={styles.image}>
        <img src={image} alt="author" />
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
      <Input
        value={isbn}
        type={'text'}
        onChange={setIsbn}
        className={styles.input}
        placeholder={'ISBN'}
      />
      {authorOptions.length > 0 ? (
        <Select
          options={authorOptions}
          onChange={setAuthorByOption}
          caption={'Author'}
          initialOption={getInitialAuthorOption()}
        />
      ) : (
        <div>Loading...</div>
      )}
      {authorOptions.length > 0 ? (
        <Select
          options={genreOptions}
          onChange={setGenreByOption}
          caption={'Genre'}
          initialOption={getInitialGenreOption()}
        />
      ) : (
        <div>Loading...</div>
      )}
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

export default BookEditForm;
