import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { ReactComponent as AccountIcon } from '../../assets/icons/account-icon.svg';
import { ReactComponent as OpenaiIcon } from '../../assets/icons/openai-icon.svg';
import { ReactComponent as WishListIcon } from '../../assets/icons/wishlist-icon.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import useScrollDirection from '../../core/hooks/useScrollDirection';
import ActiveLink from '../../core/types/activeLink';
import { useStore } from '../../context/storeContext';
import { observer } from 'mobx-react';

const Header = observer(() => {
  const [searchString, setSearchString] = useState('');
  const isHeaderShown = useScrollDirection();
  const userStore = useStore('UserStore');
  const navigate = useNavigate();

  const setActiveLink = (active: ActiveLink) =>
    active.isActive ? `${styles.activeLink}` : '';

  const searchBooks = () => {
    navigate(`books?search=${searchString}`);
  };

  return (
    <header className={`${styles.header} ${isHeaderShown ? '' : styles.hide}`}>
      <div className={`${styles.topPanel} container`}>
        <NavLink to={'/books'} className={styles.logo}>
          <Logo />
        </NavLink>
        <div className={styles.searchBar}>
          <input
            value={searchString}
            onChange={(event) => setSearchString(event.target.value)}
            className={styles.searchInput}
            placeholder={'Search Books'}
          />
          <SearchIcon className={styles.searchIcon} onClick={searchBooks} />
        </div>
        <div className={styles.menu}>
          <NavLink to={'/advice'} className={setActiveLink}>
            <OpenaiIcon className={styles.openaiIcon} />
            <span className={styles.cartCaption}>{'Need advice?'}</span>
          </NavLink>
          <NavLink to={'/readbooks'} className={setActiveLink}>
            <WishListIcon className={styles.wishlistIcon} />
            <span className={styles.wishlistCaption}>Read books</span>
          </NavLink>
          {userStore.getUser() ? (
            <NavLink to={'/account'} className={setActiveLink}>
              <AccountIcon className={styles.accountIcon} />
              <span className={styles.accountCaption}>Menu</span>
            </NavLink>
          ) : (
            <NavLink to={'/login'} className={styles.account}>
              <AccountIcon className={styles.accountIcon} />
              <span className={styles.accountCaption}>Sign in</span>
            </NavLink>
          )}
        </div>
      </div>
      <nav className={styles.navbar}>
        <ul className={styles.navbarList}>
          <li className={styles.navbarItem}>
            <NavLink to={'/books'} className={setActiveLink}>
              Books
            </NavLink>
          </li>
          <li className={styles.navbarItem}>
            <NavLink to={'/authors'} className={setActiveLink}>
              Authors
            </NavLink>
          </li>
          <li className={styles.navbarItem}>
            <NavLink to={'/genres'} className={setActiveLink}>
              Genres
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
});

export default Header;
