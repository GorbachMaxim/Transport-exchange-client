import React, { useState } from 'react';
import styles from './Overview.module.scss';
import Input from '../../../../components/ui/input/Input';
import Button from '../../../../components/ui/button/Button';

const Overview = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className={styles.overview}>
      <h2 className={`accountPageTitle`}>Overview</h2>
      <p className={styles.caption}>
        Feel free to edit any of your details below so your account is totally
        up to date.
      </p>
      <form className={styles.form}>
        <Input
          onChange={setUsername}
          type="text"
          className={styles.input}
          placeholder={'Username'}
        />
        <Input
          onChange={setEmail}
          type="email"
          className={styles.input}
          placeholder={'Email'}
        />
        <Input
          onChange={setPassword}
          type="password"
          className={styles.input}
          placeholder={'Password'}
        />
        <Input
          onChange={setPassword}
          type="password"
          className={styles.input}
          placeholder={'Password'}
        />
        <Button type="primary" onClick={() => {}}>
          Update
        </Button>
      </form>
    </section>
  );
};

export default Overview;
