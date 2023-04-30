import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import BooksPage from './pages/books/BooksPage';
import RegistrationPage from './pages/registration/RegistrationPage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import LoginPage from './pages/login/LoginPage';
import AuthorsListPage from './pages/authors/authorsList/AuthorsListPage';
import AccountPage from './pages/account/AccountPage';
import Overview from './pages/account/menu/overview/Overview';
import Books from './pages/account/menu/books/Books';
import Authors from './pages/account/menu/authors/Authors';
import Genres from './pages/account/menu/genres/Genres';
import Users from './pages/account/menu/users/Users';
import AuthorPage from './pages/authors/author/AuthorPage';
import AuthorEditPage from './pages/authors/edit/AuthorEditPage';
import { useStore } from './context/storeContext';

function App() {
  const userStore = useStore('UserStore');

  const fetchUser = async () => {
    await userStore.fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'books'} element={<BooksPage />} />
        <Route path={'authors'}>
          <Route index element={<AuthorsListPage />} />
          <Route path={':authorId'} element={<AuthorPage />} />
          <Route path={'edit/:authorId'} element={<AuthorEditPage />} />
        </Route>
        <Route path={'genres'} element={<HomePage />} />
        <Route path={'contacts'} element={<HomePage />} />
        <Route path={'registration'} element={<RegistrationPage />} />
        <Route path={'login'} element={<LoginPage />} />
        <Route path={'account'} element={<AccountPage />}>
          <Route index element={<Navigate to="/account/overview" />} />
          <Route path={'/account/overview'} element={<Overview />} />
          <Route path={'/account/books'} element={<Books />} />
          <Route path={'/account/authors'} element={<Authors />} />
          <Route path={'/account/genres'} element={<Genres />} />
          <Route path={'/account/users'} element={<Users />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
