import React from 'react';
import BookCard from '../cards/book/BookCard';
import styles from './gptAdvice.module.scss';
import { useStore } from '../../context/storeContext';
import { observer } from 'mobx-react';
import Typewriter from 'typewriter-effect';

const GptAdvice = observer(() => {
  const gptStore = useStore('GptStore');

  return (
    gptStore.getGptAdvice() && (
      <div>
        <BookCard
          book={gptStore.getGptAdvice().bookDto}
          className={styles.bookCard}
        />
        <p className={styles.text}>
          <Typewriter
            options={{
              strings: gptStore.getGptAdvice().message,
              autoStart: true,
              delay: 25,
            }}
          />
        </p>
      </div>
    )
  );
});

export default GptAdvice;
