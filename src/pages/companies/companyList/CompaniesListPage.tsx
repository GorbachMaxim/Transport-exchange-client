import React, { FC, useEffect } from 'react';
import styles from './CompaniesListPage.module.scss';
import { useStore } from '../../../context/storeContext';
import { observer } from 'mobx-react';
import Loader from '../../../components/ui/loader/Loader';
import { useSearchParams } from 'react-router-dom';
import CompaniesList from '../../../components/lists/companies/CompaniesList';

const CompaniesListPage: FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const companyStore = useStore('CompanyStore');

  const fetchCompanies = new Promise<void>(async (resolve) => {
    const search = searchParams.get('search');
    if (search !== null) {
      //await companyStore.searchCompanies(search);
    } else {
      await companyStore.fetchCompanies();
    }
    resolve();
  });

  return (
    <main className={`${styles.companiesPage} container page`}>
      <h2 className={`pageTitle`}>Компании</h2>
      <Loader promise={fetchCompanies} loaderClassName={styles.loader}>
        <CompaniesList />
      </Loader>
    </main>
  );
});

export default CompaniesListPage;
