import React, { useState } from 'react';
import styles from './Overview.module.scss';
import { useStore } from '../../../../context/storeContext';
import { observer } from 'mobx-react';
import Button from '../../../../components/ui/button/Button';

const Overview = observer(() => {
  const userStore = useStore('UserStore');

  const verifyAccount = async () => {
    await userStore.verify();
    await userStore.fetchUser();
  };

  return (
    <section className={styles.overview}>
      <h2 className={`accountPageTitle`}>Общая информация</h2>
      <div className={styles.username}>
        <span>Username: </span>
        <span>{userStore.getUser()?.username}</span>
      </div>
      <div className={styles.email}>
        <span>Email: </span>
        <span>{userStore.getUser()?.email}</span>
      </div>
      {userStore.getUser()?.verified ? (
        <div className={styles.verification}>
          <span className={styles.verified}>Ваш аккаунт подтвержден</span>
        </div>
      ) : (
        <div className={styles.verification}>
          <span className={styles.notVerified}>Ваш аккаунт не подтвержден</span>
          <Button onClick={verifyAccount} type={'primary'}>
            Подтвердить
          </Button>
        </div>
      )}
    </section>
  );
});

export default Overview;
