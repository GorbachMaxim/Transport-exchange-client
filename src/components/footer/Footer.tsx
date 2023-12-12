import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { ReactComponent as InstagramIcon } from '../../assets/icons/instagram-icon.svg';
import { ReactComponent as GithubIcon } from '../../assets/icons/github-icon.svg';
import { ReactComponent as LinkedinIcon } from '../../assets/icons/linkedin-icon.svg';
import { ReactComponent as VkIcon } from '../../assets/icons/vk-icon.svg';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={`${styles.content} container`}>
        <div className={styles.main}>
          <div className={styles.follow}>
            <Logo className={styles.logo} />
            <p className={styles.caption}>
              Подписывайтесь на наши социальный сети
            </p>
            <ul className={styles.social}>
              <li className={styles.socialLink}>
                <Link to={''} target={'_blank'}>
                  <LinkedinIcon />
                </Link>
              </li>
              <li className={styles.socialLink}>
                <Link to={'https://github.com/GorbachMaxim'} target={'_blank'}>
                  <GithubIcon />
                </Link>
              </li>
              <li className={styles.socialLink}>
                <Link to={''} target={'_blank'}>
                  <InstagramIcon />
                </Link>
              </li>
              <li className={styles.socialLink}>
                <Link to={'https://vk.com/cringe_developer'} target={'_blank'}>
                  <VkIcon />
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.about}>
            <h4 className={styles.title}>About</h4>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <Link to={'/car_offers'}>Машины</Link>
              </li>
              <li className={styles.listItem}>
                <Link to={'/cargo_offers'}>Грузы</Link>
              </li>
              <li className={styles.listItem}>
                <Link to={'/companies'}>Компании</Link>
              </li>
            </ul>
          </div>
          <div className={styles.contacts}>
            <h4 className={styles.title}>Contacts</h4>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <Link to={'/account'}>Аккаунт</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.rights}>
          <div>&copy; Все права защищены, 2023</div>
          <div>
            <span className={styles.privacy}>Privacy</span> | Terms of Service
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
