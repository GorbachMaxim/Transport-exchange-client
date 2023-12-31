import React, { useRef } from 'react';
import CrossIcon from '../../assets/icons/cross-icon.svg';
import styles from './Confirmation.module.scss';
import Button from '../ui/button/Button';
import { useStore } from '../../context/storeContext';
import { observer } from 'mobx-react-lite';

const Modal = observer((): JSX.Element => {
  const overlay = useRef<HTMLDivElement>(null);
  const confirmationStore = useStore('ConfirmationStore');

  const onClickOutside = (target: EventTarget) => {
    if (target === overlay.current) {
      confirmationStore.close();
    }
  };

  const close = () => {
    confirmationStore.close();
  };

  const confirm = () => {
    confirmationStore.onConfirm();
    confirmationStore.close();
  };

  return (
    <div
      data-testid="overlay"
      ref={overlay}
      className={`${styles.overlay} ${
        confirmationStore.isActiveConfirmation ||
        confirmationStore.isActiveWarning
          ? ''
          : styles.close
      }`}
      onClick={(event) => onClickOutside(event.target)}
    >
      <div className={styles.window}>
        <button className={styles.closeBtn} onClick={close}>
          <img src={CrossIcon} alt="cross" />
        </button>
        <span className={styles.title}>{confirmationStore.title}</span>
        <span className={styles.text}>{confirmationStore.text}</span>
        {confirmationStore.isActiveConfirmation ? (
          <div className={styles.buttons} data-testid="buttons">
            <Button
              onClick={close}
              type="secondary"
              className={styles.cancelBtn}
            >
              Нет
            </Button>
            <Button
              onClick={confirm}
              type="primary"
              className={styles.confirmBtn}
              data-testid="confirmBtn"
            >
              Да
            </Button>
          </div>
        ) : (
          <Button onClick={close} type="primary" className={styles.okBtn}>
            Ок
          </Button>
        )}
      </div>
    </div>
  );
});

export default Modal;
