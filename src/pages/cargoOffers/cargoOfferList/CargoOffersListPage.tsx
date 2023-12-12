import React, { FC, useEffect } from 'react';
import styles from './CargoOfferListPage.module.scss';
import { useStore } from '../../../context/storeContext';
import { observer } from 'mobx-react';
import Loader from '../../../components/ui/loader/Loader';
import { useSearchParams } from 'react-router-dom';
import CargoOffersList from '../../../components/lists/cargoOffers/CargoOffersList';

const CargoOffersListPage: FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const cargoOfferStore = useStore('CargoOfferStore');

  const fetchCargoOffers = new Promise<void>(async (resolve) => {
    const search = searchParams.get('search');
    if (search !== null) {
      //await companyStore.searchCompanies(search);
    } else {
      await cargoOfferStore.fetchCargoOffers();
    }
    resolve();
  });

  return (
    <main className={`${styles.carOffersPage} container page`}>
      <h2 className={`pageTitle`}>Грузы</h2>
      <Loader promise={fetchCargoOffers} loaderClassName={styles.loader}>
        <CargoOffersList />
      </Loader>
    </main>
  );
});

export default CargoOffersListPage;
