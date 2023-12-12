import React, { useEffect, useState } from 'react';
import styles from './CargoOfferEditForm.module.scss';
import Input from '../../../ui/input/Input';
import Button from '../../../ui/button/Button';
import { TextArea } from '../../../ui/textArea/TextArea';
import Form from '../../../form/Form';
import ImageEditor from '../../../imageEditor/ImageEditor';

import { useStore } from '../../../../context/storeContext';
import Cargo from '../../../../core/types/cargo';
import City from '../../../../core/types/city';
import { SearchInput } from '../../../ui/selectWithSearch/SearchInput';
import CargoOffer from '../../../../core/types/cargoOffer';

interface CargoOfferEditFormProps {
  cargoOffer: CargoOffer;
  onSubmit: (carOffer: CargoOffer) => void;
}

const CargoOfferEditForm = (props: CargoOfferEditFormProps) => {
  const [fromCity, setFromCity] = useState<string>(props.cargoOffer.fromCity);
  const [toCity, setToCity] = useState<string>(props.cargoOffer.toCity);
  const [price, setPrice] = useState<string>(props.cargoOffer.price);

  const [image, setImage] = useState<string>(props.cargoOffer.cargo.image);
  const [type, setType] = useState<string>(props.cargoOffer.cargo.type);
  const [weight, setWeight] = useState<string>(props.cargoOffer.cargo.weight);
  const [description, setDescription] = useState<string>(
    props.cargoOffer.cargo.description,
  );

  const cityStore = useStore('CityStore');
  const confirmationStore = useStore('ConfirmationStore');

  const onSubmit = async () => {
    if (fromCity == '' || toCity == '') {
      confirmationStore.showWarning('Укажите город отправления и прибытия');

      return;
    }

    const cargo: Cargo = {
      id: props.cargoOffer.cargo.id,
      image,
      type,
      weight,
      description,
    };
    const cargoOffer: Partial<CargoOffer> = {
      id: props.cargoOffer.id,
      fromCity,
      toCity,
      price,
      cargo,
    };
    props.onSubmit(cargoOffer as CargoOffer);
  };

  const onFromCity = (city: City | null): void => {
    if (city) setFromCity(city.name);
  };

  const onToCity = (city: City | null): void => {
    if (city) setToCity(city.name);
  };

  const setOptions = async (): Promise<void> => {
    cityStore.fetchCities();
  };

  const notFoundFromCity = async (): Promise<void> => {
    setFromCity('');
  };

  const notFoundToCity = async (): Promise<void> => {
    setToCity('');
  };

  useEffect(() => {
    setOptions();
  }, []);

  return (
    <Form>
      <div className={styles.image}>
        <img src={image} alt="Груз" />
        <ImageEditor
          onLoad={(newImage) => setImage(newImage || '')}
          className={styles.imageLoader}
        />
      </div>
      <Input
        value={type}
        type={'text'}
        onChange={setType}
        className={styles.input}
        placeholder={'Тип груза'}
      />
      <Input
        value={weight}
        type={'text'}
        onChange={setWeight}
        className={styles.input}
        placeholder={'Масса'}
      />
      {cityStore.cities.length > 0 ? (
        <SearchInput
          value={fromCity}
          cities={cityStore.cities}
          onSelectCity={onFromCity}
          setNotFound={notFoundFromCity}
          text={'Город отправления'}
        />
      ) : (
        <div>Не удалось загрузить города</div>
      )}
      {cityStore.cities.length > 0 ? (
        <SearchInput
          value={toCity}
          cities={cityStore.cities}
          onSelectCity={onToCity}
          setNotFound={notFoundToCity}
          text={'Город прибытия'}
        />
      ) : (
        <div>Не удалось загрузить города</div>
      )}
      <Input
        value={price}
        type={'text'}
        onChange={setPrice}
        className={styles.input}
        placeholder={'Цена'}
      />
      <TextArea
        value={description}
        onChange={setDescription}
        className={styles.input}
        placeholder={'Описание'}
      />
      <Button type="primary" onClick={onSubmit}>
        Изменить
      </Button>
    </Form>
  );
};

export default CargoOfferEditForm;
