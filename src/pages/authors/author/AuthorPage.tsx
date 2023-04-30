import React, { useEffect, useState } from 'react';
import styles from './AuthorPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import Author from '../../../core/types/author';
import { AUTHORS_ROUTE } from '../../../core/constants/routes';
import { observer } from 'mobx-react';
import { useStore } from '../../../context/storeContext';

const AuthorPage = observer(() => {
  const [author, setAuthor] = useState<Author>(null!);
  const authorStore = useStore('AuthorStore');
  const { authorId } = useParams();
  const navigate = useNavigate();

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
    <div className={`${styles.authorPage} container page`}>
      {author && (
        <div className={styles.content}>
          <div className={styles.image}>
            <img src={author.image} alt="author" />
          </div>
          <div className={styles.text}>
            <h2
              className={styles.name}
            >{`${author.name} ${author.surname}`}</h2>
            <p>{author.biography}</p>
          </div>
        </div>
      )}
    </div>
  );
});

export default AuthorPage;
