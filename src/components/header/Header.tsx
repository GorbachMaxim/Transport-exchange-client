import React, { useEffect } from 'react';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { ReactComponent as AccountIcon } from '../../assets/icons/account-icon.svg';
import { ReactComponent as CartIcon } from '../../assets/icons/cart-icon.svg';
import { ReactComponent as WishListIcon } from '../../assets/icons/wishlist-icon.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import useScrollDirection from '../../core/hooks/useScrollDirection';
import ActiveLink from '../../core/types/activeLink';
import { useStore } from '../../context/storeContext';
import { observer } from 'mobx-react';

const Header = observer(() => {
  const isHeaderShown = useScrollDirection();
  const userStore = useStore('UserStore');

  const setActiveLink = (active: ActiveLink) =>
    active.isActive ? `${styles.activeLink}` : '';

  return (
    <header className={`${styles.header} ${isHeaderShown ? '' : styles.hide}`}>
      <div className={`${styles.topPanel} container`}>
        <NavLink to={'/books'} className={styles.logo}>
          <Logo />
        </NavLink>
        <div className={styles.searchBar}>
          <input className={styles.searchInput} placeholder={'Search Books'} />
          <SearchIcon className={styles.searchIcon} />
        </div>
        <div className={styles.menu}>
          <NavLink to={'/cart'} className={styles.cart}>
            <CartIcon className={styles.cartIcon} />
            <span className={styles.cartCaption}>{'Need advice?'}</span>
          </NavLink>
          <NavLink to={'/wishlist'} className={styles.wishlist}>
            <WishListIcon className={styles.wishlistIcon} />
            <span className={styles.wishlistCaption}>Read books</span>
          </NavLink>
          {userStore.getUser() ? (
            <NavLink to={'/account'} className={styles.account}>
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
