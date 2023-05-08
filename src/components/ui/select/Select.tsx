import React, { useEffect, useState, useRef } from 'react';
import styles from './Select.module.scss';
import Option from '../../../core/types/option';
import { ReactComponent as ArrowIcon } from '../../../assets/icons/arrow-icon.svg';

interface SelectProps {
  options: Option[];
  onChange: (option: Option) => void;
  caption: string;
  initialOption?: Option;
}

const Select = (props: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    props.initialOption?.value || props.options[0].value,
  );

  const arrowAnimation = () =>
    `${styles.arrow} ${isOpen ? styles.rotateUp : styles.rotateDown}`;

  const setSelected = (option: Option) => {
    setSelectedOption(option.value);
    setIsOpen(!isOpen);
    props.onChange(option);
  };

  useEffect(() => {
    props.onChange(props.initialOption || props.options[0]);
  }, []);

  return (
    <div className={styles.select}>
      <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.caption}>
          <span>{props.caption}</span>
          <span className={styles.colon}>: </span>
          <span className={styles.selectedOption}>{selectedOption}</span>
        </div>
        <ArrowIcon className={arrowAnimation()} />
      </button>
      {isOpen && (
        <ul className={styles.list}>
          {props.options.map((option) => (
            <li
              className={styles.option}
              key={option.id}
              onClick={() => setSelected(option)}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
