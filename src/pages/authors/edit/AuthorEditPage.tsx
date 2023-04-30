import React, { useEffect, useState } from 'react';
import styles from './AuthorEditPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import AuthorEditForm from '../../../components/forms/author/edit/AuthorEditForm';
import api from '../../../core/api/api';
import { AUTHORS_ROUTE } from '../../../core/constants/routes';
import Author from '../../../core/types/author';
import { useStore } from '../../../context/storeContext';

const AuthorEditPage = () => {
  const [author, setAuthor] = useState<Author>(null!);
  const authorStore = useStore('AuthorStore');
  const { authorId } = useParams();
  const navigate = useNavigate();

  const updateAuthor = async (author: Author) => {
    await authorStore.updateAuthor(author);
  };

  const fetchAuthor = async () => {
    const receivedAuthor = await authorStore.fetchAuthorById(Number(authorId));
    if (receivedAuthor) {
      setAuthor(receivedAuthor);
    } else {
      navigate(`${AUTHORS_ROUTE}`);
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, []);

  return (
    <div className={`${styles.authorEditPage} container page`}>
      <h2 className={`pageTitle`}>Edit Author</h2>
      {author && <AuthorEditForm author={author} onSubmit={updateAuthor} />}
    </div>
  );
};

export default AuthorEditPage;
