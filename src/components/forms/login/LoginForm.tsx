import React, { useState } from 'react';
import styles from './LoginForm.module.scss';
import Input from '../../ui/input/Input';
import Button from '../../ui/button/Button';
import { AuthData } from '../../../core/types/user';

interface LoginFormProps {
  onSubmit: (user: AuthData) => void;
}

const LoginForm = (props: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const preventDefaultSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault();

  const onSubmit = () => {
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
      <Button type="primary" onClick={onSubmit}>
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
