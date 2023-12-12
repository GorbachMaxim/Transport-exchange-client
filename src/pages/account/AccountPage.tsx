import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './AccountPage.module.scss';
import { ReactComponent as OverviewIcon } from '../../assets/icons/account-icon.svg';
import { ReactComponent as CompanyIcon } from '../../assets/icons/company-icon.svg';
import { ReactComponent as CarIcon } from '../../assets/icons/truck-icon.svg';
import { ReactComponent as CargoIcon } from '../../assets/icons/box-icon.svg';
import { ReactComponent as UsersIcon } from '../../assets/icons/people-icon.svg';
import { ReactComponent as LogoutIcon } from '../../assets/icons/logout-icon.svg';
import { ReactComponent as StatisticsIcon } from '../../assets/icons/statistics-icon.svg';
import ActiveLink from '../../core/types/activeLink';
import { useStore } from '../../context/storeContext';
import { HOME_ROUTE } from '../../core/constants/routes';
import AvailableFor from '../../components/availableFor/AvailableFor';
import { observer } from 'mobx-react';

const AccountPage = observer(() => {
  const userStore = useStore('UserStore');
  const navigate = useNavigate();

  const setActiveLink = (active: ActiveLink) =>
    active.isActive
      ? `${styles.activeLink} ${styles.menuItem}`
      : styles.menuItem;

  const logout = async () => {
    await userStore.logout();
    navigate(HOME_ROUTE);
  };

  const fetchUser = async () => {
    await userStore.fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <main className={`${styles.account} container page`}>
      <ul className={styles.menu}>
        <li>
          <NavLink to={'/account/overview'} className={setActiveLink}>
            <OverviewIcon className={styles.icon} />
            <span>Об аккаунте</span>
          </NavLink>
        </li>
        <AvailableFor roles={['ROLE_ADMIN']}>
          <li>
            <NavLink to={'/account/companies'} className={setActiveLink}>
              <CompanyIcon className={styles.icon} />
              <span>Компании</span>
            </NavLink>
          </li>
        </AvailableFor>
        <AvailableFor roles={['ROLE_ADMIN']}>
          <li>
            <NavLink to={'/account/car_offers'} className={setActiveLink}>
              <CarIcon className={styles.icon} />
              <span>Машины</span>
            </NavLink>
          </li>
        </AvailableFor>
        <AvailableFor roles={['ROLE_ADMIN']}>
          <li>
            <NavLink to={'/account/cargo_offers'} className={setActiveLink}>
              <CargoIcon className={styles.icon} />
              <span>Грузы</span>
            </NavLink>
          </li>
        </AvailableFor>
        <AvailableFor roles={['ROLE_ADMIN']}>
          <li>
            <NavLink to={'/account/users'} className={setActiveLink}>
              <UsersIcon className={styles.icon} />
              <span>Пользователи</span>
            </NavLink>
          </li>
        </AvailableFor>
        <AvailableFor roles={['ROLE_ADMIN']}>
          <li>
            <NavLink to={'/account/statistics'} className={setActiveLink}>
              <StatisticsIcon className={styles.icon} />
              <span>Статистика компаний</span>
            </NavLink>
          </li>
        </AvailableFor>
        <li>
          <button
            className={`${styles.menuItem} ${styles.logoutBtn}`}
            onClick={logout}
          >
            <LogoutIcon className={styles.icon} />
            <span>Выйти</span>
          </button>
        </li>
      </ul>
      <div className={styles.content}>
        <Outlet />
      </div>
    </main>
  );
});

export default AccountPage;
