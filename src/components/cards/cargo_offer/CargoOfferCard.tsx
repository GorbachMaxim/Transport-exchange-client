import React from 'react';
import styles from './CargoOfferCard.module.scss';
import {
  CAR_OFFERS_ROUTE,
  CARGO_OFFERS_ROUTE,
  COMPANIES_ROUTE,
  MY_COMPANY_ROUTE,
} from '../../../core/constants/routes';
import { useNavigate } from 'react-router-dom';
import CargoOffer from '../../../core/types/cargoOffer';

interface CargoOfferCardProps {
  cargoOffer: CargoOffer;
  className?: string;
}

const CargoOfferCard = (props: CargoOfferCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.cargoOfferCard} ${props.className || ''}`}
      onClick={() => navigate(`${CARGO_OFFERS_ROUTE}/${props.cargoOffer.id}`)}
    >
      <div className={styles.image}>
        <img src={props.cargoOffer.cargo.image} alt="Машина" />
      </div>
      <div className={styles.mainInfo}>
        <div className={styles.info}>
          <div className={styles.title}>
            <span className={styles.name}>{props.cargoOffer.cargo.type}</span>
            <span className={styles.company}>
              {props.cargoOffer.company.name}
            </span>
          </div>
        </div>
        <div className={styles.info}>
          <div>
            <span className={styles.type}>Цена: </span>
            <span>{props.cargoOffer.price}</span>
          </div>
          <div>
            <span className={styles.type}>Вес: </span>
            <span>{props.cargoOffer.cargo.weight}</span>
          </div>
        </div>
        <div className={styles.info}>
          <div>
            <span className={styles.type}>Отправление: </span>
            <span>{`${props.cargoOffer.fromCity}`}</span>
          </div>
          <div>
            <span className={styles.type}>Прибытие: </span>
            <span>{`${props.cargoOffer.toCity}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CargoOfferCard;
