import React, { useState } from 'react';
import styles from './Overview.module.scss';
import { useStore } from '../../../../context/storeContext';
import { observer } from 'mobx-react';

const Overview = observer(() => {
  const userStore = useStore('UserStore');

  return (
    <section className={styles.overview}>
      <h2 className={`accountPageTitle`}>Overview</h2>
      <div className={styles.verification}>
        <span>Your account is not verified</span>
      </div>
      <div className={styles.username}>
        <span>Username: </span>
        <span>{userStore.getUser()?.username}</span>
      </div>
      <div className={styles.email}>
        <span>Email: </span>
        <span>{userStore.getUser()?.email}</span>
      </div>
    </section>
  );
});

export default Overview;
