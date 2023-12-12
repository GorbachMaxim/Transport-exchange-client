import React from 'react';
import styles from './CompaniesList.module.scss';
import CompanyCard from '../../cards/company/CompanyCard';
import { useStore } from '../../../context/storeContext';
import { observer } from 'mobx-react';

const CompaniesList = observer(() => {
  const companyStore = useStore('CompanyStore');

  return (
    <ul className={styles.list}>
      {companyStore.getCompanies().length > 0 ? (
        companyStore
          .getCompanies()
          .map((company) => <CompanyCard company={company} key={company.id} />)
      ) : (
        <div>Нет компаний</div>
      )}
    </ul>
  );
});

export default CompaniesList;
