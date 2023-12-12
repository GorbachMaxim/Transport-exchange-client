import React, { useEffect, useState } from 'react';
import styles from './CarOfferEditForm.module.scss';
import Input from '../../../ui/input/Input';
import Button from '../../../ui/button/Button';
import { TextArea } from '../../../ui/textArea/TextArea';
import Form from '../../../form/Form';
import ImageEditor from '../../../imageEditor/ImageEditor';
import CarOffer, { CarOfferCreateData } from '../../../../core/types/carOffer';
import { useStore } from '../../../../context/storeContext';
import Car from '../../../../core/types/car';
import City from '../../../../core/types/city';
import { SearchInput } from '../../../ui/selectWithSearch/SearchInput';

interface CarOfferEditFormProps {
  carOffer: CarOffer;
  onSubmit: (carOffer: CarOffer) => void;
}

const CarOfferEditForm = (props: CarOfferEditFormProps) => {
  const [fromCity, setFromCity] = useState<string>(props.carOffer.fromCity);
  const [toCity, setToCity] = useState<string>(props.carOffer.toCity);
  const [price, setPrice] = useState<string>(props.carOffer.price);

  const [image, setImage] = useState<string>(props.carOffer.car.image);
  const [model, setModel] = useState<string>(props.carOffer.car.model);
  const [mass, setMass] = useState<string>(props.carOffer.car.mass);
  const [volume, setVolume] = useState<string>(props.carOffer.car.volume);
  const [description, setDescription] = useState<string>(
    props.carOffer.car.description,
  );

  const cityStore = useStore('CityStore');
  const confirmationStore = useStore('ConfirmationStore');

  const onSubmit = async () => {
    if (fromCity == '' || toCity == '') {
      confirmationStore.showWarning('Укажите город отправления и прибытия');

      return;
    }

    const car: Car = {
      id: props.carOffer.car.id,
      image,
      model,
      mass,
      volume,
      description,
    };
    const carOffer: Partial<CarOffer> = {
      id: props.carOffer.id,
      fromCity,
      toCity,
      price,
      car,
    };
    props.onSubmit(carOffer as CarOffer);
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
        <img src={image} alt="Машина" />
        <ImageEditor
          onLoad={(newImage) => setImage(newImage || '')}
          className={styles.imageLoader}
        />
      </div>
      <Input
        value={model}
        type={'text'}
        onChange={setModel}
        className={styles.input}
        placeholder={'Модель автомобиля'}
      />
      <Input
        value={mass}
        type={'text'}
        onChange={setMass}
        className={styles.input}
        placeholder={'Масса'}
      />
      <Input
        value={volume}
        type={'text'}
        onChange={setVolume}
        className={styles.input}
        placeholder={'Объем'}
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

export default CarOfferEditForm;
