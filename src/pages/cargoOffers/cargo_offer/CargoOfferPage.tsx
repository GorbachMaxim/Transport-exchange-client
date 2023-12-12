import React, { useEffect, useState } from 'react';
import styles from './CargoOfferPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../../../context/storeContext';
import {
  ACCOUNT_ROUTE,
  CARGO_OFFERS_ROUTE,
} from '../../../core/constants/routes';
import { Link } from 'react-router-dom';
import CargoOffer from '../../../core/types/cargoOffer';

import Comment, { CommentCreateData } from '../../../core/types/comment';
import CommentForm from '../../../components/forms/comment/CommentForm';
import CommentList from '../../../components/lists/comments/CommentList';
import Button from '../../../components/ui/button/Button';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete-icon.svg';
import MapComponent from '../../../components/map/YandexMap';

const CargoOfferPage = observer(() => {
  const [cargoOffer, setCargoOffer] = useState<CargoOffer>(null!);
  const cargoOfferStore = useStore('CargoOfferStore');
  const userStore = useStore('UserStore');
  const commentStore = useStore('CommentStore');
  const { cargoOfferId } = useParams();
  const navigate = useNavigate();

  const sendComment = async (comment: CommentCreateData) => {
    if (userStore.getUser() !== null) {
      await commentStore.addComment(cargoOffer.id, comment as Comment);
      await commentStore.fetchComments(cargoOffer.id);
    }
  };

  const fetchCargoOffer = async () => {
    const receivedCargoOffer = await cargoOfferStore.fetchCargoOfferById(
      Number(cargoOfferId),
    );

    if (receivedCargoOffer) {
      setCargoOffer(receivedCargoOffer);
    } else {
      navigate(CARGO_OFFERS_ROUTE);
    }
  };

  const toEditPage = (cargoOfferId: number): void => {
    navigate(`${CARGO_OFFERS_ROUTE}/edit/${cargoOfferId}`);
  };

  const deleteCarOffer = async (carOffer: CargoOffer): Promise<void> => {
    await cargoOfferStore.deleteCargoOfferWithNavigate(carOffer, () => {
      navigate(`${CARGO_OFFERS_ROUTE}`);
    });
  };

  useEffect(() => {
    fetchCargoOffer();
  }, []);

  return (
    <div className={`${styles.cargoOfferPage} container page`}>
      {cargoOffer && (
        <div>
          {userStore.getUser()?.username === cargoOffer.company.username && (
            <h2 className={`pageTitle`}>Ваш груз</h2>
          )}
          <div className={styles.content}>
            <div className={styles.sidePanel}>
              <div className={styles.image}>
                <img src={cargoOffer.cargo.image} alt="Груз" />
              </div>

              {userStore.getUser()?.username ===
                cargoOffer.company.username && (
                <div className={styles.sidePanel}>
                  <Button
                    className={styles.edit}
                    onClick={() => toEditPage(cargoOffer.id)}
                    type={'primary'}
                  >
                    <EditIcon />
                    Изменить
                  </Button>
                  <Button
                    className={styles.edit}
                    onClick={() => deleteCarOffer(cargoOffer)}
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
                <h2 className={styles.name}>{cargoOffer.cargo.type}</h2>
                <p className={styles.description}>{cargoOffer.cargo.weight}</p>
                <p className={styles.description}>
                  {cargoOffer.cargo.description}
                </p>
                <h4 className={styles.number}>Цена: {cargoOffer.price}</h4>
                <h4 className={styles.email}>
                  Компания: {cargoOffer.company.name}
                </h4>
              </div>
              <MapComponent
                origin={cargoOffer.fromCity}
                destination={cargoOffer.toCity}
              />
              <div className={styles.comment}>
                <h2>Отклики</h2>
                {userStore.getUser()?.username !==
                  cargoOffer.company.username &&
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
                <CommentList offerId={cargoOffer.id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default CargoOfferPage;
