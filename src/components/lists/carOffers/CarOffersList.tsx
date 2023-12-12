import React from 'react';
import styles from './CarOffersList.module.scss';
import CarOfferCard from '../../cards/car_offer/CarOfferCard';
import { useStore } from '../../../context/storeContext';
import { observer } from 'mobx-react';

const CarOffersList = observer(() => {
  const carOfferStore = useStore('CarOfferStore');

  return (
    <ul className={styles.list}>
      {carOfferStore.getCarOffers().length > 0 ? (
        carOfferStore
          .getCarOffers()
          .map((carOffer) => (
            <CarOfferCard carOffer={carOffer} key={carOffer.id} />
          ))
      ) : (
        <div>Нет машин</div>
      )}
    </ul>
  );
});

export default CarOffersList;
