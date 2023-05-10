import React, { useState } from 'react';
import styles from './LoginPage.module.scss';
import { AuthData } from '../../core/types/user';
import Input from '../../components/ui/input/Input';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/button/Button';
import { useStore } from '../../context/storeContext';
import { ACCOUNT_ROUTE, BOOKS_ROUTE } from '../../core/constants/routes';
import LoginForm from '../../components/forms/login/LoginForm';

const LoginPage = () => {
  const userStore = useStore('UserStore');
  const navigate = useNavigate();

  const onSubmit = async (user: AuthData) => {
    await userStore.singIn(user);
    if (userStore.getUser()) {
      navigate(BOOKS_ROUTE);
    }
  };

  return (
    <main className={`${styles.loginPage} container`}>
      <div className={styles.login}>
        <h2 className={styles.title}>Login</h2>
        <p className={styles.caption}>Please enter your login and password:</p>
        <LoginForm onSubmit={onSubmit} />
        <div className={styles.create}>
          <span>{"Don't have an account? "}</span>
          <NavLink to="/registration">Create one</NavLink>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
