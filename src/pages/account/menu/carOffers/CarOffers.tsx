import React, { useEffect, useState } from 'react';
import styles from './CarOffers.module.scss';
import { useStore } from '../../../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete-icon.svg';
import Button from '../../../../components/ui/button/Button';
import Company from '../../../../core/types/company';
import { COMPANIES_ROUTE } from '../../../../core/constants/routes';
import CarOffer from '../../../../core/types/carOffer';

const CarOffers = observer(() => {
  const carOfferStore = useStore('CarOfferStore');
  const navigate = useNavigate();

  const fetchCarOffers = async (): Promise<void> => {
    await carOfferStore.fetchCarOffers();
  };

  const deleteCarOffer = async (carOffer: CarOffer): Promise<void> => {
    await carOfferStore.deleteCarOffer(carOffer);
  };

  useEffect(() => {
    fetchCarOffers();
  }, []);

  return (
    <section className={styles.main}>
      <h2 className={`accountPageTitle`}>Машины</h2>
      <ul>
        <li className={styles.headers}>
          <div className={styles.indexHeader}>
            <span>#</span>
          </div>
          <div className={styles.nameHeader}>
            <span>Модель</span>
          </div>
          <div className={styles.companyHeader}>
            <span>Компания</span>
          </div>
          <div className={styles.idHeader}>
            <span>ID</span>
          </div>
          <div></div>
        </li>
        {carOfferStore.getCarOffers().length > 0 ? (
          carOfferStore.getCarOffers().map((carOffer, index) => (
            <li className={styles.item} key={carOffer.id}>
              <span className={styles.index}>{index + 1}</span>
              <span className={styles.name}>{carOffer.car.model}</span>
              <span className={styles.company}>{carOffer.company.name}</span>
              <span className={styles.id}>{carOffer.id}</span>

              <button
                className={styles.deleteBtn}
                onClick={() => deleteCarOffer(carOffer)}
              >
                <DeleteIcon />
              </button>
            </li>
          ))
        ) : (
          <div>Машин нет</div>
        )}
      </ul>
    </section>
  );
});

export default CarOffers;
