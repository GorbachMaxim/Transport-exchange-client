import React, { useState } from 'react';
import styles from '../../../pages/registration/RegistrationPage.module.scss';
import Input from '../../ui/input/Input';
import Button from '../../ui/button/Button';
import { AuthData } from '../../../core/types/user';
import Form from '../../form/Form';

interface RegistrationFormProps {
  onSubmit: (user: AuthData) => void;
}

const RegistrationForm = (props: RegistrationFormProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
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
        placeholder={'Пароль'}
      />
      <Input
        onChange={setPassword}
        type="password"
        className={styles.input}
        placeholder={'Подтвердите пароль'}
      />
      <Button type="primary" onClick={onSubmit}>
        Создать аккаунт
      </Button>
    </Form>
  );
};

export default RegistrationForm;
