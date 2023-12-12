import React, { FC, useEffect } from 'react';
import styles from './CarOfferListPage.module.scss';
import { useStore } from '../../../context/storeContext';
import { observer } from 'mobx-react';
import Loader from '../../../components/ui/loader/Loader';
import { useSearchParams } from 'react-router-dom';
import CarOffersList from '../../../components/lists/carOffers/CarOffersList';

const CarOffersListPage: FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const carOfferStore = useStore('CarOfferStore');

  const fetchCarOffers = new Promise<void>(async (resolve) => {
    const search = searchParams.get('search');
    if (search !== null) {
      //await companyStore.searchCompanies(search);
    } else {
      await carOfferStore.fetchCarOffers();
    }
    resolve();
  });

  return (
    <main className={`${styles.carOffersPage} container page`}>
      <h2 className={`pageTitle`}>Машины</h2>
      <Loader promise={fetchCarOffers} loaderClassName={styles.loader}>
        <CarOffersList />
      </Loader>
    </main>
  );
});

export default CarOffersListPage;
