import React, { useEffect, useState } from 'react';
import styles from './CarOfferCreateForm.module.scss';
import Input from '../../../ui/input/Input';
import { TextArea } from '../../../ui/textArea/TextArea';
import { ImageLoader } from '../../../ui/imageLoader/ImageLoader';
import Button from '../../../ui/button/Button';
import Form from '../../../form/Form';
import { useStore } from '../../../../context/storeContext';
import { observer } from 'mobx-react';
import { SearchInput } from '../../../ui/selectWithSearch/SearchInput';
import City from '../../../../core/types/city';
import cargoOffer, {
  CargoOfferCreateData,
} from '../../../../core/types/cargoOffer';
import Cargo from '../../../../core/types/cargo';

interface CargoOfferCreateFormProps {
  onSubmit: (cargoOffer: CargoOfferCreateData) => void;
}

const CargoOfferCreateForm = observer((props: CargoOfferCreateFormProps) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [price, setPrice] = useState('');

  const [image, setImage] = useState('');
  const [type, setType] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');

  const cityStore = useStore('CityStore');
  const confirmationStore = useStore('ConfirmationStore');

  const onSubmit = async () => {
    if (fromCity == '' || toCity == '') {
      confirmationStore.showWarning('Укажите город отправления и прибытия');

      return;
    }

    const cargo: Cargo = {
      id: null,
      image,
      type,
      weight,
      description,
    };
    const cargoOffer: Partial<CargoOfferCreateData> = {
      fromCity,
      toCity,
      price,
      cargo,
    };
    props.onSubmit(cargoOffer as CargoOfferCreateData);
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
      <Input type="text" placeholder="Тип груза" onChange={setType} />
      <Input type="text" placeholder="Вес" onChange={setWeight} />
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
      <Input type="text" placeholder="Цена перевозки" onChange={setPrice} />
      <TextArea placeholder="Описание" onChange={setDescription} />
      <Button type="primary" onClick={onSubmit}>
        Создать
      </Button>
    </Form>
  );
});

export default CargoOfferCreateForm;
