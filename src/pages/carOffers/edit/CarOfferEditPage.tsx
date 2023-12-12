import React, { useEffect, useState } from 'react';
import styles from './CarOfferEditPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CAR_OFFERS_ROUTE,
  MY_COMPANY_ROUTE,
} from '../../../core/constants/routes';
import { useStore } from '../../../context/storeContext';
import CarOfferEditForm from '../../../components/forms/carOffer/edit/CarOfferEditForm';
import CarOffer from '../../../core/types/carOffer';

const CarOfferEditPage = () => {
  const [carOffer, setCarOffer] = useState<CarOffer>(null!);
  const carOfferStore = useStore('CarOfferStore');
  const { carOfferId } = useParams();
  const navigate = useNavigate();

  const updateCarOffer = async (carOffer: CarOffer) => {
    const response = await carOfferStore.updateCarOffer(carOffer);

    if (response !== null) {
      navigate(`${CAR_OFFERS_ROUTE}/${carOffer.id}`);
    }
  };

  const fetchCarOffer = async () => {
    const receivedCarOffer = await carOfferStore.fetchCarOfferById(
      Number(carOfferId),
    );
    if (receivedCarOffer) {
      setCarOffer(receivedCarOffer);
    } else {
      navigate(CAR_OFFERS_ROUTE);
    }
  };

  useEffect(() => {
    fetchCarOffer();
  }, []);

  return (
    <main className={`${styles.carOfferEditPage} container page`}>
      <h2 className={`pageTitle`}>Изменить машину</h2>
      {carOffer && (
        <CarOfferEditForm carOffer={carOffer} onSubmit={updateCarOffer} />
      )}
    </main>
  );
};

export default CarOfferEditPage;
