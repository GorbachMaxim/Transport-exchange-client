import React from 'react';
import styles from './AdvicePage.module.scss';
import Loader from '../../components/ui/loader/Loader';
import { useStore } from '../../context/storeContext';
import GptAdvice from '../../components/gptAdvice/gptAdvice';
import { observer } from 'mobx-react';

const AdvicePage = () => {
  const gptStore = useStore('GptStore');

  const fetchGptAdvice = new Promise<void>(async (resolve) => {
    await gptStore.fetchGptAdvice();
    resolve();
  });

  return (
    <div className={`${styles.advicePage} container page`}>
      <h2 className={`pageTitle`}>ChatGPT advice</h2>
      <Loader promise={fetchGptAdvice} loaderClassName={styles.loader}>
        <GptAdvice />
      </Loader>
    </div>
  );
};

export default AdvicePage;
