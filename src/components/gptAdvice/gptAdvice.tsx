import React from 'react';
import BookCard from '../cards/book/BookCard';
import styles from '../../pages/advice/AdvicePage.module.scss';
import { useStore } from '../../context/storeContext';
import { observer } from 'mobx-react';

const GptAdvice = observer(() => {
  const gptStore = useStore('GptStore');

  return (
    gptStore.getGptAdvice() && (
      <div>
        <BookCard book={gptStore.getGptAdvice().bookDto} />
        <p className={styles.text}>{gptStore.getGptAdvice().message}</p>
      </div>
    )
  );
});

export default GptAdvice;
