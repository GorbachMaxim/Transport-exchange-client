import React, { useState } from 'react';
import styles from './TextArea.module.scss';

export interface TextAreaProps {
  onChange: (newValue: string) => void;
  value?: string;
  className?: string;
}

export const TextArea = (props: TextAreaProps): JSX.Element => {
  const textAreaChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    props.onChange(event.currentTarget.value);
  };

  return (
    <textarea
      value={props.value}
      className={`${styles.textArea} ${props.className || ''}`}
      onChange={textAreaChangeHandler}
    />
  );
};
