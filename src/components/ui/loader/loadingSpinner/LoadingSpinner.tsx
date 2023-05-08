import React from 'react';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  loaderClassName?: string;
  spinnerClassName?: string;
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  return (
    <div className={`${styles.spinnerWrapper} ${props.loaderClassName || ''}`}>
      <div className={`${styles.spinner} ${props.spinnerClassName || ''}`} />
    </div>
  );
};

export default LoadingSpinner;
