import React from 'react';
import styles from './CompanyCreatePage.module.scss';
import { useStore } from '../../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import { MY_COMPANY_ROUTE } from '../../../core/constants/routes';
import CompanyCreateForm from '../../../components/forms/company/create/CompanyCreateForm';
import companyStore from '../../../store/companyStore';
import { CompanyCreateData } from '../../../core/types/company';

const CompanyCreatePage = () => {
  const companyStore = useStore('CompanyStore');
  const navigate = useNavigate();

  const onSubmit = async (company: CompanyCreateData): Promise<void> => {
    await companyStore.createMyCompany(company);
    navigate(MY_COMPANY_ROUTE);
  };

  return (
    <main className={`${styles.companyCreatePage} container page`}>
      <h2 className={`pageTitle`}>У вас еще нет компании? Создайте!</h2>
      <CompanyCreateForm onSubmit={onSubmit} />
    </main>
  );
};

export default CompanyCreatePage;
