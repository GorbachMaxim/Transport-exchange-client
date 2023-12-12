import React from 'react';
import styles from './CargoOfferCreatePage.module.scss';
import { useStore } from '../../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import { CARGO_OFFERS_ROUTE } from '../../../core/constants/routes';
import CargoOfferCreateForm from '../../../components/forms/cargoOffer/create/CargoOfferCreateForm';
import { CargoOfferCreateData } from '../../../core/types/cargoOffer';

const CargoOfferCreatePage = () => {
  const cargoOfferStore = useStore('CargoOfferStore');
  const navigate = useNavigate();

  const onSubmit = async (cargoOffer: CargoOfferCreateData): Promise<void> => {
    await cargoOfferStore.createCargoOffer(cargoOffer);
    navigate(`${CARGO_OFFERS_ROUTE}`);
  };

  return (
    <main className={`${styles.cargoOfferCreatePage} container page`}>
      <h2 className={`pageTitle`}>Создать предложение груза</h2>
      <CargoOfferCreateForm onSubmit={onSubmit} />
    </main>
  );
};

export default CargoOfferCreatePage;
