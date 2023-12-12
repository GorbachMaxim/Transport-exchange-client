import React, { useEffect, useState } from 'react';
import styles from './CarOfferPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../../../context/storeContext';
import {
  ACCOUNT_ROUTE,
  CAR_OFFERS_ROUTE,
  COMPANIES_ROUTE,
} from '../../../core/constants/routes';
import { Link } from 'react-router-dom';
import CarOffer from '../../../core/types/carOffer';

import Comment, { CommentCreateData } from '../../../core/types/comment';
import CommentForm from '../../../components/forms/comment/CommentForm';
import CommentList from '../../../components/lists/comments/CommentList';
import Button from '../../../components/ui/button/Button';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete-icon.svg';
import Company from '../../../core/types/company';
import MapComponent from '../../../components/map/YandexMap';

const CarOfferPage = observer(() => {
  const [carOffer, setCarOffer] = useState<CarOffer>(null!);
  const carOfferStore = useStore('CarOfferStore');
  const userStore = useStore('UserStore');
  const commentStore = useStore('CommentStore');
  const { carOfferId } = useParams();
  const navigate = useNavigate();

  const sendComment = async (comment: CommentCreateData) => {
    if (userStore.getUser() !== null) {
      await commentStore.addComment(carOffer.id, comment as Comment);
      await commentStore.fetchComments(carOffer.id);
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

  const toEditPage = (carOfferId: number): void => {
    navigate(`${CAR_OFFERS_ROUTE}/edit/${carOfferId}`);
  };

  const deleteCarOffer = async (carOffer: CarOffer): Promise<void> => {
    await carOfferStore.deleteCarOfferWithNavigate(carOffer, () => {
      navigate(`${CAR_OFFERS_ROUTE}`);
    });
  };

  useEffect(() => {
    fetchCarOffer();
  }, []);

  return (
    <div className={`${styles.carOfferPage} container page`}>
      {carOffer && (
        <div>
          {userStore.getUser()?.username === carOffer.company.username && (
            <h2 className={`pageTitle`}>Ваша машина</h2>
          )}
          <div className={styles.content}>
            <div className={styles.sidePanel}>
              <div className={styles.image}>
                <img src={carOffer.car.image} alt="Машина" />
              </div>

              {userStore.getUser()?.username === carOffer.company.username && (
                <div className={styles.sidePanel}>
                  <Button
                    className={styles.edit}
                    onClick={() => toEditPage(carOffer.id)}
                    type={'primary'}
                  >
                    <EditIcon />
                    Изменить
                  </Button>
                  <Button
                    className={styles.edit}
                    onClick={() => deleteCarOffer(carOffer)}
                    type={'primary'}
                  >
                    <DeleteIcon />
                    Удалить
                  </Button>
                </div>
              )}
            </div>
            <div className={styles.text}>
              <div>
                <h2 className={styles.name}>{carOffer.car.model}</h2>
                <p className={styles.description}>{carOffer.car.mass}</p>
                <p className={styles.description}>{carOffer.car.volume}</p>
                <p className={styles.description}>{carOffer.car.description}</p>
                <h4 className={styles.number}>Цена: {carOffer.price}</h4>
                <h4 className={styles.email}>
                  Компания: {carOffer.company.name}
                </h4>
              </div>

              <MapComponent
                origin={carOffer.fromCity}
                destination={carOffer.toCity}
              />

              <div className={styles.comment}>
                <h2>Отклики</h2>
                {userStore.getUser()?.username !== carOffer.company.username &&
                  (userStore.getUser()?.verified ? (
                    <CommentForm onSubmit={sendComment} />
                  ) : (
                    <div className={styles.notVerified}>
                      Вы должны подтвердить ваш аккаунт перед тем как оставлять
                      отклики.
                      <Link
                        to={`${ACCOUNT_ROUTE}/overview`}
                        className={styles.verifyLink}
                      >
                        Нажмите здесь чтобы подтвердить
                      </Link>
                    </div>
                  ))}
                <CommentList offerId={carOffer.id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default CarOfferPage;
