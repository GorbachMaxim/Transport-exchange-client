import React from 'react';
import styles from './CarOfferCreatePage.module.scss';
import { useStore } from '../../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import { CarOfferCreateData } from '../../../core/types/carOffer';
import CarOfferCreateForm from '../../../components/forms/carOffer/create/CarOfferCreateForm';
import _default from 'chart.js/dist/plugins/plugin.tooltip';
import { CAR_OFFERS_ROUTE } from '../../../core/constants/routes';

const CarOfferCreatePage = () => {
  const carOfferStore = useStore('CarOfferStore');
  const navigate = useNavigate();

  const onSubmit = async (carOffer: CarOfferCreateData): Promise<void> => {
    await carOfferStore.createCarOffer(carOffer);
    navigate(`${CAR_OFFERS_ROUTE}`);
  };

  return (
    <main className={`${styles.carOfferCreatePage} container page`}>
      <h2 className={`pageTitle`}>Создать предложение машины</h2>
      <CarOfferCreateForm onSubmit={onSubmit} />
    </main>
  );
};

export default CarOfferCreatePage;
