import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AccountPage.module.scss';
import { ReactComponent as OverviewIcon } from '../../assets/icons/account-icon.svg';
import { ReactComponent as BookIcon } from '../../assets/icons/book-icon.svg';
import { ReactComponent as AuthorIcon } from '../../assets/icons/person-circle-icon.svg';
import { ReactComponent as GenreIcon } from '../../assets/icons/bookmark-icon.svg';
import { ReactComponent as UsersIcon } from '../../assets/icons/people-icon.svg';
import ActiveLink from '../../core/types/activeLink';

const AccountPage = () => {
  const setActiveLink = (active: ActiveLink) =>
    active.isActive
      ? `${styles.activeLink} ${styles.menuItem}`
      : styles.menuItem;

  return (
    <div className={`${styles.account} container page`}>
      <ul className={styles.menu}>
        <li>
          <NavLink to={'/account'} className={setActiveLink}>
            <OverviewIcon className={styles.icon} />
            <span>Account overview</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={'/link'} className={setActiveLink}>
            <BookIcon className={styles.icon} />
            <span>Books</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={'/link'} className={setActiveLink}>
            <AuthorIcon className={styles.icon} />
            <span>Authors</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={'/link'} className={setActiveLink}>
            <GenreIcon className={styles.icon} />
            <span>Genres</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={'/link'} className={setActiveLink}>
            <UsersIcon className={styles.icon} />
            <span>Users</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AccountPage;