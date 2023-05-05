import React, { ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  type: 'primary' | 'secondary';
  className?: string;
}

const Button = (props: ButtonProps) => {
  const className = `${styles.button} ${styles[props.type] || ''} ${
    props.className || ''
  }`;

  return (
    <button className={className} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
