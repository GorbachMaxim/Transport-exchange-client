import React, { useEffect, useState } from 'react';
import styles from './MyCompanyPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../../../context/storeContext';
import {
  ACCOUNT_ROUTE,
  CAR_OFFERS_ROUTE,
  CARGO_OFFERS_ROUTE,
  COMPANIES_ROUTE,
  MY_COMPANY_ROUTE,
} from '../../../core/constants/routes';
import ReviewList from '../../../components/lists/review/ReviewList';
import Button from '../../../components/ui/button/Button';
import { ReactComponent as StarIcon } from '../../../assets/icons/star-icon.svg';
import ReviewForm from '../../../components/forms/review/ReviewForm';
import Review, { CommentCreateData } from '../../../core/types/review';
import { Link } from 'react-router-dom';
import Company from '../../../core/types/company';
import { ReactComponent as CarIcon } from '../../../assets/icons/truck-icon.svg';
import { ReactComponent as CargoIcon } from '../../../assets/icons/box-icon.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete-icon.svg';

const MyCompanyPage = observer(() => {
  const [company, setCompany] = useState<Company>(null!);
  const companyStore = useStore('CompanyStore');
  const userStore = useStore('UserStore');
  const reviewStore = useStore('ReviewStore');
  const { companyId } = useParams();
  const navigate = useNavigate();

  // const addReadBook = async () => {
  //   await userStore.addReadBook(book);
  //   navigate(READBOOKS_ROUTE);
  // };
  //
  // const removeReadBook = async () => {
  //   await userStore.removeReadBook(book);
  //   navigate(READBOOKS_ROUTE);
  // };

  const sendReview = async (review: CommentCreateData) => {
    if (userStore.getUser() !== null) {
      await reviewStore.addReview(company, review as Review);
      await reviewStore.fetchReviews(company.id);
    }
  };

  const fetchCompany = async () => {
    const receivedCompany = await companyStore.fetchMyCompany();

    if (receivedCompany) {
      setCompany(receivedCompany);
    } else {
      navigate(`${COMPANIES_ROUTE}/create`);
    }
  };

  const toCreateCarOfferPage = (): void => {
    navigate(`${CAR_OFFERS_ROUTE}/create`);
  };

  const toCreateCargoOfferPage = (): void => {
    navigate(`${CARGO_OFFERS_ROUTE}/create`);
  };

  const toEditPage = (companyId: number): void => {
    navigate(`${COMPANIES_ROUTE}/edit/${companyId}`);
  };

  const deleteCompany = async (company: Company): Promise<void> => {
    companyStore.deleteMyCompanyWithNavigate(company, () => {
      fetchCompany();
    });
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  return (
    <div className={`${styles.companyPage} container page`}>
      <h2 className={`pageTitle`}>Моя компания</h2>
      {company && (
        <div className={styles.content}>
          <div className={styles.sidePanel}>
            <div className={styles.image}>
              <img src={company.image} alt="Компания" />
            </div>
            <div className={styles.rating}>
              {company.avgScore > 0 ? (
                <span className={styles.avgScore}>
                  Рейтинг: {company.avgScore}
                </span>
              ) : (
                <span className={styles.avgScore}>Еще нет рейтинга</span>
              )}
              <div className={styles.yourScore}>
                {[...new Array(5)].map((_, index) => (
                  <StarIcon
                    className={`${styles.starIcon} ${
                      index < Math.floor(company.avgScore)
                        ? styles.activeStar
                        : ''
                    }`}
                    key={index}
                  />
                ))}
              </div>
            </div>
            <Button
              className={styles.add}
              onClick={() => toCreateCarOfferPage()}
              type={'primary'}
            >
              <CarIcon />
              Добавить машину
            </Button>
            <Button
              className={styles.add}
              onClick={() => toCreateCargoOfferPage()}
              type={'primary'}
            >
              <CargoIcon />
              Добавить груз
            </Button>
            <Button
              className={styles.edit}
              onClick={() => toEditPage(company.id)}
              type={'primary'}
            >
              <EditIcon />
              Изменить
            </Button>
            <Button
              className={styles.edit}
              onClick={() => deleteCompany(company)}
              type={'primary'}
            >
              <DeleteIcon />
              Удалить
            </Button>
          </div>
          <div className={styles.text}>
            <div>
              <h2 className={styles.name}>{company.name}</h2>
              <p className={styles.description}>{company.description}</p>
              <h4 className={styles.number}>
                Номер телефона: {company.number}
              </h4>
              <h4 className={styles.email}>Email: {company.email}</h4>
            </div>
            <div className={styles.review}>
              <h2>Отзывы</h2>
              {userStore.getUser()?.verified ? (
                <ReviewForm onSubmit={sendReview} />
              ) : (
                <div className={styles.notVerified}>
                  Вы должны подтвердить ваш аккаунт перед тем как оставлять
                  обзоры.
                  <Link
                    to={`${ACCOUNT_ROUTE}/overview`}
                    className={styles.verifyLink}
                  >
                    Нажмите здесь чтобы подтвердить
                  </Link>
                </div>
              )}
              <ReviewList companyId={company.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default MyCompanyPage;
