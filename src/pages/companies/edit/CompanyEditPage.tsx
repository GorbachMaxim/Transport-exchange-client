import React, { useEffect, useState } from 'react';
import styles from './CompanyEditPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { MY_COMPANY_ROUTE } from '../../../core/constants/routes';
import { useStore } from '../../../context/storeContext';
import Company from '../../../core/types/company';
import CompanyEditForm from '../../../components/forms/company/edit/CompanyEditForm';

const CompanyEditPage = () => {
  const [company, setCompany] = useState<Company>(null!);
  const companyStore = useStore('CompanyStore');
  const { companyId } = useParams();
  const navigate = useNavigate();

  const updateCompany = async (company: Company) => {
    const response = await companyStore.updateMyCompany(company);

    if (response !== null) {
      navigate(`${MY_COMPANY_ROUTE}`);
    }
  };

  const fetchCompany = async () => {
    const receivedCompany = await companyStore.fetchCompanyById(
      Number(companyId),
    );
    if (receivedCompany) {
      setCompany(receivedCompany);
    } else {
      navigate(MY_COMPANY_ROUTE);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  return (
    <main className={`${styles.companyEditPage} container page`}>
      <h2 className={`pageTitle`}>Изменить компанию</h2>
      {company && (
        <CompanyEditForm company={company} onSubmit={updateCompany} />
      )}
    </main>
  );
};

export default CompanyEditPage;
