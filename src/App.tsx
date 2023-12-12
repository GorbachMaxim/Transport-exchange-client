import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CompaniesListPage from './pages/companies/companyList/CompaniesListPage';
import RegistrationPage from './pages/registration/RegistrationPage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import LoginPage from './pages/login/LoginPage';

import AccountPage from './pages/account/AccountPage';
import Overview from './pages/account/menu/overview/Overview';

import Users from './pages/account/menu/users/Users';

import { useStore } from './context/storeContext';
import { COMPANIES_ROUTE, LOGIN_ROUTE } from './core/constants/routes';
import Loader from './components/ui/loader/Loader';
import styles from './App.module.scss';

import Confirmation from './components/confirmation/Confirmation';

import UserEditPage from './pages/user/edit/UserEditPage';

import Statistics from './pages/account/menu/statistics/Statistics';
import CompanyPage from './pages/companies/company/CompanyPage';
import CompanyCreatePage from './pages/companies/create/CompanyCreatePage';
import CompanyEditPage from './pages/companies/edit/CompanyEditPage';
import Companies from './pages/account/menu/companies/Companies';
import MyCompanyPage from './pages/companies/myCompany/MyCompanyPage';
import CarOfferCreatePage from './pages/carOffers/create/CarOfferCreatePage';
import CargoOfferCreatePage from './pages/cargoOffers/create/CargoOfferCreatePage';
import CarOffers from './pages/account/menu/carOffers/CarOffers';
import CargoOffers from './pages/account/menu/cargoOffers/CargoOffers';
import CarOffersListPage from './pages/carOffers/carOfferList/CarOffersListPage';
import CarOfferPage from './pages/carOffers/car_offer/CarOfferPage';
import CarOfferEditPage from './pages/carOffers/edit/CarOfferEditPage';
import CargoOffersListPage from './pages/cargoOffers/cargoOfferList/CargoOffersListPage';
import CargoOfferEditPage from './pages/cargoOffers/edit/CargoOfferEditPage';
import CargoOfferPage from './pages/cargoOffers/cargo_offer/CargoOfferPage';

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
          <Route path={'companies'}>
            <Route index element={<CompaniesListPage />} />
            <Route path={':companyId'} element={<CompanyPage />} />
            <Route path={'create'} element={<CompanyCreatePage />} />
            <Route path={'edit/:companyId'} element={<CompanyEditPage />} />
          </Route>
          <Route path={'car_offers'}>
            <Route index element={<CarOffersListPage />} />
            <Route path={':carOfferId'} element={<CarOfferPage />} />
            <Route path={'create'} element={<CarOfferCreatePage />} />
            <Route path={'edit/:carOfferId'} element={<CarOfferEditPage />} />
          </Route>
          <Route path={'cargo_offers'}>
            <Route index element={<CargoOffersListPage />} />
            <Route path={':cargoOfferId'} element={<CargoOfferPage />} />
            <Route path={'create'} element={<CargoOfferCreatePage />} />
            <Route
              path={'edit/:cargoOfferId'}
              element={<CargoOfferEditPage />}
            />
          </Route>
          {/*<Route path={'authors'}>*/}
          {/*  <Route index element={<AuthorsListPage />} />*/}
          {/*  <Route path={':authorId'} element={<AuthorPage />} />*/}
          {/*  <Route path={'create'} element={<AuthorCreatePage />} />*/}
          {/*  <Route path={'edit/:authorId'} element={<AuthorEditPage />} />*/}
          {/*</Route>*/}
          {/*<Route path={'genres'}>*/}
          {/*  <Route index element={<GenresListPage />} />*/}
          {/*  <Route path={':genreId'} element={<GenrePage />} />*/}
          {/*  <Route path={'create'} element={<GenreCreatePage />} />*/}
          {/*  <Route path={'edit/:genreId'} element={<GenreEditPage />} />*/}
          {/*</Route>*/}
          <Route path={'user'}>
            <Route path={'edit/:userId'} element={<UserEditPage />} />
          </Route>
          <Route path={'my_company'} element={<MyCompanyPage />} />
          <Route path={'registration'} element={<RegistrationPage />} />
          <Route path={'login'} element={<LoginPage />} />
          <Route path={'account'} element={<AccountPage />}>
            <Route index element={<Navigate to="/account/overview" />} />
            <Route path={'/account/overview'} element={<Overview />} />
            <Route path={'/account/companies'} element={<Companies />} />
            <Route path={'/account/car_offers'} element={<CarOffers />} />
            <Route path={'/account/cargo_offers'} element={<CargoOffers />} />
            <Route path={'/account/users'} element={<Users />} />
            <Route path={'/account/statistics'} element={<Statistics />} />
          </Route>
        </Routes>
        <Footer />
        <Confirmation />
      </BrowserRouter>
    </Loader>
  );
}

export default App;
