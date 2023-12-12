import React, { useEffect, useState } from 'react';
import styles from './CompanyEditForm.module.scss';
import Input from '../../../ui/input/Input';
import Button from '../../../ui/button/Button';
import { TextArea } from '../../../ui/textArea/TextArea';
import Form from '../../../form/Form';
import ImageEditor from '../../../imageEditor/ImageEditor';
import Company, { CompanyCreateData } from '../../../../core/types/company';
import Select from '../../../ui/select/Select';
import Option from '../../../../core/types/option';
import { useStore } from '../../../../context/storeContext';

interface CompanyEditFormProps {
  company: Company;
  onSubmit: (company: Company) => void;
}

const CompanyEditForm = (props: CompanyEditFormProps) => {
  const [image, setImage] = useState<string>(props.company.image);
  const [name, setName] = useState<string>(props.company.name);
  const [email, setEmail] = useState<string>(props.company.email);
  const [number, setNumber] = useState<string>(props.company.number);
  const [description, setDescription] = useState<string>(
    props.company.description,
  );

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
      <div className={styles.image}>
        <img src={image} alt="Компания" />
        <ImageEditor
          onLoad={(newImage) => setImage(newImage || '')}
          className={styles.imageLoader}
        />
      </div>
      <Input
        value={name}
        type={'text'}
        onChange={setName}
        className={styles.input}
        placeholder={'Название'}
      />
      <Input
        value={email}
        type={'text'}
        onChange={setEmail}
        className={styles.input}
        placeholder={'Email'}
      />
      <Input
        value={number}
        type={'text'}
        onChange={setNumber}
        className={styles.input}
        placeholder={'Номер телефона'}
      />
      <TextArea
        value={description}
        onChange={setDescription}
        className={styles.input}
        placeholder={'Description'}
      />
      <Button type="primary" onClick={onSubmit}>
        Изменить
      </Button>
    </Form>
  );
};

export default CompanyEditForm;
