import React, { useEffect, useState } from 'react';
import styles from './Companies.module.scss';
import { useStore } from '../../../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete-icon.svg';
import Button from '../../../../components/ui/button/Button';
import Company from '../../../../core/types/company';
import { COMPANIES_ROUTE } from '../../../../core/constants/routes';

const Companies = observer(() => {
  const companyStore = useStore('CompanyStore');
  const navigate = useNavigate();

  const fetchCompanies = async (): Promise<void> => {
    await companyStore.fetchCompanies();
  };

  const deleteCompany = async (company: Company): Promise<void> => {
    await companyStore.deleteCompany(company);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <section className={styles.main}>
      <h2 className={`accountPageTitle`}>Компании</h2>
      <ul className={styles.authorsList}>
        <li className={styles.headers}>
          <div className={styles.indexHeader}>
            <span>#</span>
          </div>
          <div className={styles.nameHeader}>
            <span>Название</span>
          </div>
          <div className={styles.usernameHeader}>
            <span>Владелец</span>
          </div>
          <div className={styles.idHeader}>
            <span>ID</span>
          </div>
          <div></div>
        </li>
        {companyStore.getCompanies().length > 0 ? (
          companyStore.getCompanies().map((company, index) => (
            <li className={styles.item} key={company.id}>
              <span className={styles.index}>{index + 1}</span>
              <span className={styles.name}>{company.name}</span>
              <span className={styles.username}>{company.username}</span>
              <span className={styles.id}>{company.id}</span>

              <button
                className={styles.deleteBtn}
                onClick={() => deleteCompany(company)}
              >
                <DeleteIcon />
              </button>
            </li>
          ))
        ) : (
          <div>Компаний нет</div>
        )}
      </ul>
    </section>
  );
});

export default Companies;
