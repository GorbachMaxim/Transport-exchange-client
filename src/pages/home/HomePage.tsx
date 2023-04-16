import React, { FC, useEffect } from 'react';
import styles from './HomePage.module.scss';
import Header from '../../components/header/Header';
import api from '../../core/api/api';

const HomePage: FC = () => {
  // const fetchBooks = async () => {
  //   const books = await api.fetchBooks();
  //   console.log(books);
  // };
  //
  // useEffect(() => {
  //   fetchBooks();
  // }, []);

  return <main className={styles.homePage}>Home</main>;
};

export default HomePage;
