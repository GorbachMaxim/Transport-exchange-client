import React, { useState } from 'react';
import styles from './LoginForm.module.scss';
import Input from '../../ui/input/Input';
import Button from '../../ui/button/Button';
import preventDefaultSubmit from '../../../core/utils/preventDefaultSubmit';
import { AuthData } from '../../../core/types/user';
import Form from '../../form/Form';
import userStore from '../../../store/userStore';

interface LoginFormProps {
  onSubmit: (user: AuthData) => void;
}

const LoginForm = (props: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    const user: AuthData = {
      username,
      email,
      password,
    };
    props.onSubmit(user);
  };

  return (
    <Form>
      <Input
        onChange={setUsername}
        type="text"
        className={styles.input}
        placeholder={'Имя пользователя'}
      />
      {/*<Input*/}
      {/*  onChange={setEmail}*/}
      {/*  type="email"*/}
      {/*  className={styles.input}*/}
      {/*  placeholder={'Email'}*/}
      {/*/>*/}
      <Input
        onChange={setPassword}
        type="password"
        className={styles.input}
        placeholder={'Пароль'}
      />
      <Button type="primary" onClick={onSubmit}>
        Войти
      </Button>
    </Form>
  );
};

export default LoginForm;
