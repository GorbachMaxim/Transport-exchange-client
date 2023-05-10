import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './AccountPage.module.scss';
import { ReactComponent as OverviewIcon } from '../../assets/icons/account-icon.svg';
import { ReactComponent as BookIcon } from '../../assets/icons/book-icon.svg';
import { ReactComponent as AuthorIcon } from '../../assets/icons/person-circle-icon.svg';
import { ReactComponent as GenreIcon } from '../../assets/icons/bookmark-icon.svg';
import { ReactComponent as UsersIcon } from '../../assets/icons/people-icon.svg';
import { ReactComponent as LogoutIcon } from '../../assets/icons/logout-icon.svg';
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
            <span>Account overview</span>
          </NavLink>
        </li>
        <AvailableFor roles={['ROLE_ADMIN']}>
          <li>
            <NavLink to={'/account/books'} className={setActiveLink}>
              <BookIcon className={styles.icon} />
              <span>Books</span>
            </NavLink>
          </li>
        </AvailableFor>
        <AvailableFor roles={['ROLE_ADMIN']}>
          <li>
            <NavLink to={'/account/authors'} className={setActiveLink}>
              <AuthorIcon className={styles.icon} />
              <span>Authors</span>
            </NavLink>
          </li>
        </AvailableFor>
        <AvailableFor roles={['ROLE_ADMIN']}>
          <li>
            <NavLink to={'/account/genres'} className={setActiveLink}>
              <GenreIcon className={styles.icon} />
              <span>Genres</span>
            </NavLink>
          </li>
        </AvailableFor>
        <AvailableFor roles={['ROLE_ADMIN']}>
          <li>
            <NavLink to={'/account/users'} className={setActiveLink}>
              <UsersIcon className={styles.icon} />
              <span>Users</span>
            </NavLink>
          </li>
        </AvailableFor>
        <li>
          <button
            className={`${styles.menuItem} ${styles.logoutBtn}`}
            onClick={logout}
          >
            <LogoutIcon className={styles.icon} />
            <span>Logout</span>
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
