import React from 'react';
import styles from './CarOfferCard.module.scss';
import {
  CAR_OFFERS_ROUTE,
  COMPANIES_ROUTE,
  MY_COMPANY_ROUTE,
} from '../../../core/constants/routes';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as StarIcon } from '../../../assets/icons/star-icon.svg';
import CarOffer from '../../../core/types/carOffer';
import { useStore } from '../../../context/storeContext';

interface CarOfferCardProps {
  carOffer: CarOffer;
  className?: string;
}

const CarOfferCard = (props: CarOfferCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.carOfferCard} ${props.className || ''}`}
      onClick={() => navigate(`${CAR_OFFERS_ROUTE}/${props.carOffer.id}`)}
    >
      <div className={styles.image}>
        <img src={props.carOffer.car.image} alt="Машина" />
      </div>
      <div className={styles.mainInfo}>
        <div className={styles.info}>
          <div className={styles.title}>
            <span className={styles.name}>{props.carOffer.car.model}</span>
            <span className={styles.company}>
              {props.carOffer.company.name}
            </span>
          </div>
          <div>
            <span className={styles.type}>Цена: </span>
            <span>{props.carOffer.price}</span>
          </div>
        </div>
        <div className={styles.info}>
          <div>
            <span className={styles.type}>Вес: </span>
            <span>{props.carOffer.car.mass}</span>
          </div>
          <div>
            <span className={styles.type}>Объем: </span>
            <span>{props.carOffer.car.volume}</span>
          </div>
        </div>
        <div className={styles.info}>
          <div>
            <span className={styles.type}>Отправление: </span>
            <span>{`${props.carOffer.fromCity}`}</span>
          </div>
          <div>
            <span className={styles.type}>Прибытие: </span>
            <span>{`${props.carOffer.toCity}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarOfferCard;
