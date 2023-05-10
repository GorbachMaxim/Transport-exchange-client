import React from 'react';
import styles from './AdvicePage.module.scss';
import Loader from '../../components/ui/loader/Loader';
import { useStore } from '../../context/storeContext';
import GptAdvice from '../../components/gptAdvice/gptAdvice';

const AdvicePage = () => {
  const gptStore = useStore('GptStore');
  const apodStore = useStore('ApodStore');

  const fetchGptAdvice = new Promise<void>(async (resolve) => {
    await gptStore.fetchGptAdvice();
    resolve();
  });

  return (
    <div
      className={styles.apodBackground}
      style={{
        background: `url("${apodStore.getApod().url}") no-repeat center center`,
        backgroundSize: 'cover',
      }}
    >
      <div className={`${styles.advicePage} container page`}>
        <h2 className={`pageTitle`}>ChatGPT advice</h2>
        <Loader
          promise={fetchGptAdvice}
          loaderClassName={styles.loader}
          spinnerClassName={styles.spinner}
        >
          <GptAdvice />
        </Loader>
      </div>
    </div>
  );
};

export default AdvicePage;
