import React, { ReactNode } from 'react';
import styles from './Input.module.scss';

interface InputProps {
  onChange: (newValue: string) => void;
  type?: 'text' | 'password' | 'email' | 'number';
  value?: string;
  placeholder?: string;
  className?: string;
}

const Input = (props: InputProps): JSX.Element => {
  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    props.onChange(event.currentTarget.value);
  };

  return (
    <input
      value={props.value}
      className={`${styles.input} ${props.className || ''}`}
      type={props.type || 'text'}
      onChange={inputChangeHandler}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
