import React, { useEffect, useState } from 'react';
import styles from './CarOfferCreateForm.module.scss';
import Input from '../../../ui/input/Input';
import { TextArea } from '../../../ui/textArea/TextArea';
import { ImageLoader } from '../../../ui/imageLoader/ImageLoader';
import Button from '../../../ui/button/Button';
import Form from '../../../form/Form';
import { useStore } from '../../../../context/storeContext';
import Select from '../../../ui/select/Select';
import Option from '../../../../core/types/option';
import { observer } from 'mobx-react';
import CarOffer, { CarOfferCreateData } from '../../../../core/types/carOffer';
import Car, { CarCreateData } from '../../../../core/types/car';
import { SearchInput } from '../../../ui/selectWithSearch/SearchInput';
import cityStore from '../../../../store/cityStore';
import City from '../../../../core/types/city';

interface CarOfferCreateFormProps {
  onSubmit: (carOffer: CarOfferCreateData) => void;
}

const CarOfferCreateForm = observer((props: CarOfferCreateFormProps) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [price, setPrice] = useState('');

  const [image, setImage] = useState('');
  const [model, setModel] = useState('');
  const [mass, setMass] = useState('');
  const [volume, setVolume] = useState('');
  const [description, setDescription] = useState('');

  const cityStore = useStore('CityStore');
  const confirmationStore = useStore('ConfirmationStore');

  const onSubmit = async () => {
    if (fromCity == '' || toCity == '') {
      confirmationStore.showWarning('Укажите город отправления и прибытия');

      return;
    }

    const car: Car = {
      id: null,
      image,
      model,
      mass,
      volume,
      description,
    };
    const carOffer: Partial<CarOfferCreateData> = {
      fromCity,
      toCity,
      price,
      car,
    };
    props.onSubmit(carOffer as CarOfferCreateData);
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
      <ImageLoader onLoad={(newImage) => setImage(newImage || '')} />
      <Input type="text" placeholder="Модель автомобиля" onChange={setModel} />
      <Input type="text" placeholder="Масса" onChange={setMass} />
      <Input type="text" placeholder="Объем" onChange={setVolume} />

      {cityStore.cities.length > 0 ? (
        <SearchInput
          value={''}
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
          value={''}
          cities={cityStore.cities}
          onSelectCity={onToCity}
          setNotFound={notFoundToCity}
          text={'Город прибытия'}
        />
      ) : (
        <div>Не удалось загрузить города</div>
      )}
      <Input type="text" placeholder="Цена" onChange={setPrice} />
      <TextArea placeholder="Описание" onChange={setDescription} />
      <Button type="primary" onClick={onSubmit}>
        Создать
      </Button>
    </Form>
  );
});

export default CarOfferCreateForm;
