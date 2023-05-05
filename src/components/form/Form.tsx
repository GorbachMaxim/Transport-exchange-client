import React from 'react';
import styles from './Form.module.scss';
import preventDefaultSubmit from '../../core/utils/preventDefaultSubmit';

interface FormProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

const Form = (props: FormProps) => {
  return (
    <form
      onSubmit={preventDefaultSubmit}
      className={`${styles.form} ${props.className || ''}`}
    >
      {props.children}
    </form>
  );
};

export default Form;
