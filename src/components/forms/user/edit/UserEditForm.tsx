import React, { useState } from 'react';
import styles from './UserEditForm.module.scss';
import Input from '../../../ui/input/Input';
import Button from '../../../ui/button/Button';
import Form from '../../../form/Form';
import User, { UpdatePassword } from '../../../../core/types/user';

interface UserEditFormProps {
  user: User;
  onSubmit: (passwords: UpdatePassword) => void;
}

const UserEditForm = (props: UserEditFormProps) => {
  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');

  const onSubmit = async () => {
    const passwords: UpdatePassword = {
      ...props.user,
      password,
    };
    await props.onSubmit(passwords);
  };

  return (
    <Form>
      <div className={styles.role}>
        <span>Role: </span>
        <span>{props.user.roles[0].name}</span>
      </div>
      <div className={styles.username}>
        <span>Username: </span>
        <span>{props.user.username}</span>
      </div>
      <div className={styles.email}>
        <span>Email: </span>
        <span>{props.user.email}</span>
      </div>
      <Input
        type={'password'}
        onChange={setPassword}
        className={styles.input}
        placeholder={'New password'}
      />
      <Input
        type={'password'}
        onChange={setConfirmedPassword}
        className={styles.input}
        placeholder={'Confirm password'}
      />
      <Button type="primary" onClick={onSubmit}>
        Update
      </Button>
    </Form>
  );
};

export default UserEditForm;
