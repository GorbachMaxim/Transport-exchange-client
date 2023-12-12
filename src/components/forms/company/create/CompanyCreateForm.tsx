import React, { useEffect, useState } from 'react';
import styles from './CompanyCreateForm.module.scss';
import Input from '../../../ui/input/Input';
import { TextArea } from '../../../ui/textArea/TextArea';
import { ImageLoader } from '../../../ui/imageLoader/ImageLoader';
import Button from '../../../ui/button/Button';
import Form from '../../../form/Form';
import Company, { CompanyCreateData } from '../../../../core/types/company';
import { useStore } from '../../../../context/storeContext';
import Option from '../../../../core/types/option';
import { observer } from 'mobx-react';
import company from '../../../../core/types/company';

interface CompanyCreateFormProps {
  onSubmit: (company: CompanyCreateData) => void;
}

const CompanyCreateForm = observer((props: CompanyCreateFormProps) => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = async () => {
    const company: Partial<CompanyCreateData> = {
      image,
      name,
      email,
      number,
      description,
    };
    props.onSubmit(company as Company);
  };

  return (
    <Form>
      <ImageLoader onLoad={(newImage) => setImage(newImage || '')} />
      <Input type="text" placeholder="Название" onChange={setName} />
      <Input type="text" placeholder="Email" onChange={setEmail} />
      <Input type="text" placeholder="Номер телефона" onChange={setNumber} />
      <TextArea placeholder="Description" onChange={setDescription} />
      <Button type="primary" onClick={onSubmit}>
        Создать
      </Button>
    </Form>
  );
});

export default CompanyCreateForm;
