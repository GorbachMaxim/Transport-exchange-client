import React from 'react';
import styles from './CargoOffersList.module.scss';
import CargoOfferCard from '../../cards/cargo_offer/CargoOfferCard';
import { useStore } from '../../../context/storeContext';
import { observer } from 'mobx-react';

const CargoOffersList = observer(() => {
  const cargoOfferStore = useStore('CargoOfferStore');

  return (
    <ul className={styles.list}>
      {cargoOfferStore.getCargoOffers().length > 0 ? (
        cargoOfferStore
          .getCargoOffers()
          .map((cargoOffer) => (
            <CargoOfferCard cargoOffer={cargoOffer} key={cargoOffer.id} />
          ))
      ) : (
        <div>Нет грузов</div>
      )}
    </ul>
  );
});

export default CargoOffersList;
