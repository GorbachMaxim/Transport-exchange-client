import React, { useEffect, useState } from 'react';
import styles from './CargoOfferEditPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CARGO_OFFERS_ROUTE,
  MY_COMPANY_ROUTE,
} from '../../../core/constants/routes';
import { useStore } from '../../../context/storeContext';
import CargoOffer from '../../../core/types/cargoOffer';
import CargoOfferEditForm from '../../../components/forms/cargoOffer/edit/CargoOfferEditForm';

const CargoOfferEditPage = () => {
  const [cargoOffer, setCargoOffer] = useState<CargoOffer>(null!);
  const cargoOfferStore = useStore('CargoOfferStore');
  const { cargoOfferId } = useParams();
  const navigate = useNavigate();

  const updateCargoOffer = async (cargoOffer: CargoOffer) => {
    const response = await cargoOfferStore.updateCargoOffer(cargoOffer);

    if (response !== null) {
      navigate(`${CARGO_OFFERS_ROUTE}/${cargoOffer.id}`);
    }
  };

  const fetchCargoOffer = async () => {
    const receivedCargoOffer = await cargoOfferStore.fetchCargoOfferById(
      Number(cargoOfferId),
    );
    if (receivedCargoOffer) {
      setCargoOffer(receivedCargoOffer);
    } else {
      navigate(CARGO_OFFERS_ROUTE);
    }
  };

  useEffect(() => {
    fetchCargoOffer();
  }, []);

  return (
    <main className={`${styles.cargoOfferEditPage} container page`}>
      <h2 className={`pageTitle`}>Изменить груз</h2>
      {cargoOffer && (
        <CargoOfferEditForm
          cargoOffer={cargoOffer}
          onSubmit={updateCargoOffer}
        />
      )}
    </main>
  );
};

export default CargoOfferEditPage;
