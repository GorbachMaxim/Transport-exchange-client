import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import BooksListPage from './pages/books/booksList/BooksListPage';
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
import AuthorCreatePage from './pages/authors/create/AuthorCreatePage';
import BookCreatePage from './pages/books/create/BookCreatePage';
import GenresListPage from './pages/genres/genresList/GenresListPage';
import GenreCreatePage from './pages/genres/create/GenreCreatePage';
import { LOGIN_ROUTE } from './core/constants/routes';
import Loader from './components/ui/loader/Loader';
import styles from './App.module.scss';
import Book from './core/types/book';
import BookEditPage from './pages/books/edit/BookEditPage';
import Confirmation from './components/confirmation/Confirmation';
import GenreEditPage from './pages/genres/edit/GenreEditPage';
import GenrePage from './pages/genres/genre/GenrePage';
import BookPage from './pages/books/book/BookPage';
import UserEditPage from './pages/user/edit/UserEditPage';
import AdvicePage from './pages/advice/AdvicePage';

function App() {
  const userStore = useStore('UserStore');

  const fetchUser = new Promise<void>(async (resolve) => {
    await userStore.fetchUser();
    resolve();
  });

  return (
    <Loader
      promise={fetchUser}
      loaderClassName={styles.loader}
      spinnerClassName={styles.spinner}
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={'/'} element={<Navigate to={`${LOGIN_ROUTE}`} />} />
          <Route path={'books'}>
            <Route index element={<BooksListPage />} />
            <Route path={':bookId'} element={<BookPage />} />
            <Route path={'create'} element={<BookCreatePage />} />
            <Route path={'edit/:bookId'} element={<BookEditPage />} />
          </Route>
          <Route path={'authors'}>
            <Route index element={<AuthorsListPage />} />
            <Route path={':authorId'} element={<AuthorPage />} />
            <Route path={'create'} element={<AuthorCreatePage />} />
            <Route path={'edit/:authorId'} element={<AuthorEditPage />} />
          </Route>
          <Route path={'genres'}>
            <Route index element={<GenresListPage />} />
            <Route path={':genreId'} element={<GenrePage />} />
            <Route path={'create'} element={<GenreCreatePage />} />
            <Route path={'edit/:genreId'} element={<GenreEditPage />} />
          </Route>
          <Route path={'user'}>
            <Route path={'edit/:userId'} element={<UserEditPage />} />
          </Route>
          <Route path={'advice'} element={<AdvicePage />} />
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
        <Confirmation />
      </BrowserRouter>
    </Loader>
  );
}

export default App;
