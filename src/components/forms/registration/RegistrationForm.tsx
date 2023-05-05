import React, { useState } from 'react';
import styles from '../../../pages/registration/RegistrationPage.module.scss';
import Input from '../../ui/input/Input';
import Button from '../../ui/button/Button';
import { AuthData } from '../../../core/types/user';

interface RegistrationFormProps {
  onSubmit: (user: AuthData) => void;
}

const RegistrationForm = (props: RegistrationFormProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const preventDefaultSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault();

  const onSubmit = async () => {
    const user: AuthData = {
      username,
      email,
      password,
    };
    props.onSubmit(user);
  };

  return (
    <form className={styles.form} onSubmit={preventDefaultSubmit}>
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
        placeholder={'Confirm password'}
      />
      <Button type="primary" onClick={onSubmit}>
        Create Account
      </Button>
    </form>
  );
};

export default RegistrationForm;
