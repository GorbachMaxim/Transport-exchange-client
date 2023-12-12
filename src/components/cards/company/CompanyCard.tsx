import React from 'react';
import styles from './CompanyCard.module.scss';
import {
  COMPANIES_ROUTE,
  MY_COMPANY_ROUTE,
} from '../../../core/constants/routes';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as StarIcon } from '../../../assets/icons/star-icon.svg';
import Company from '../../../core/types/company';
import { CarOfferCreateData } from '../../../core/types/carOffer';
import userStore from '../../../store/userStore';
import clientStore from '../../../store/clientStore';
import { useStore } from '../../../context/storeContext';
import User from '../../../core/types/user';

interface CompanyCardProps {
  company: Company;
  className?: string;
}

const CompanyCard = (props: CompanyCardProps) => {
  const navigate = useNavigate();
  const userStore = useStore('UserStore');

  const onGetCompany = async (): Promise<void> => {
    if (userStore.getUser()) {
      // @ts-ignore
      if (userStore.getUser().username == props.company.username) {
        navigate(MY_COMPANY_ROUTE);
        return;
      }
    }
    navigate(`${COMPANIES_ROUTE}/${props.company.id}`);
  };

  return (
    <div
      className={`${styles.companyCard} ${props.className || ''}`}
      onClick={(event) => onGetCompany()}
    >
      <div className={styles.image}>
        <img src={props.company.image} alt="Компания" />
        <div className={styles.yourScore}>
          {[...new Array(5)].map((_, index) => (
            <StarIcon
              className={`${styles.starIcon} ${
                index < Math.floor(props.company.avgScore)
                  ? styles.activeStar
                  : ''
              }`}
              key={index}
            />
          ))}
        </div>
      </div>
      <span className={styles.name}>{props.company.name}</span>
      <span className={styles.contacts}>{`${props.company.number}`}</span>
      <span className={styles.contacts}>{`${props.company.email}`}</span>
    </div>
  );
};

export default CompanyCard;
