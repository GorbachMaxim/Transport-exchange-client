import React, { useEffect, useState } from 'react';
import styles from './CargoOffers.module.scss';
import { useStore } from '../../../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete-icon.svg';
import CargoOffer from '../../../../core/types/cargoOffer';

const CargoOffers = observer(() => {
  const cargoOfferStore = useStore('CargoOfferStore');
  const navigate = useNavigate();

  const fetchCargoOffers = async (): Promise<void> => {
    await cargoOfferStore.fetchCargoOffers();
  };

  const deleteCargoOffer = async (cargoOffer: CargoOffer): Promise<void> => {
    await cargoOfferStore.deleteCargoOffer(cargoOffer);
  };

  useEffect(() => {
    fetchCargoOffers();
  }, []);

  return (
    <section className={styles.main}>
      <h2 className={`accountPageTitle`}>Грузы</h2>
      <ul>
        <li className={styles.headers}>
          <div className={styles.indexHeader}>
            <span>#</span>
          </div>
          <div className={styles.nameHeader}>
            <span>Тип</span>
          </div>
          <div className={styles.companyHeader}>
            <span>Компания</span>
          </div>
          <div className={styles.idHeader}>
            <span>ID</span>
          </div>
          <div></div>
        </li>
        {cargoOfferStore.getCargoOffers().length > 0 ? (
          cargoOfferStore.getCargoOffers().map((cargoOffer, index) => (
            <li className={styles.item} key={cargoOffer.id}>
              <span className={styles.index}>{index + 1}</span>
              <span className={styles.name}>{cargoOffer.cargo.type}</span>
              <span className={styles.company}>{cargoOffer.company.name}</span>
              <span className={styles.id}>{cargoOffer.id}</span>

              <button
                className={styles.deleteBtn}
                onClick={() => deleteCargoOffer(cargoOffer)}
              >
                <DeleteIcon />
              </button>
            </li>
          ))
        ) : (
          <div>Грузов нет</div>
        )}
      </ul>
    </section>
  );
});

export default CargoOffers;
