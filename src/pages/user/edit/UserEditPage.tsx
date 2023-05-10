import React, { useEffect, useState } from 'react';
import styles from './UserEditPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { ACCOUNT_ROUTE } from '../../../core/constants/routes';
import { useStore } from '../../../context/storeContext';
import User, { UpdatePassword } from '../../../core/types/user';
import UserEditForm from '../../../components/forms/user/edit/UserEditForm';

const UserEditPage = () => {
  const [user, setUser] = useState<User>(null!);
  const clientStore = useStore('ClientStore');
  const { userId } = useParams();
  const navigate = useNavigate();

  const updatePasswords = async (passwords: UpdatePassword) => {
    const response = await clientStore.updatePassword(passwords);

    if (response !== null) {
      navigate(`${ACCOUNT_ROUTE}/users`);
    }
  };

  const fetchUser = async () => {
    const receivedUser = await clientStore.fetchClientById(Number(userId));
    if (receivedUser) {
      setUser(receivedUser);
    } else {
      navigate(`${ACCOUNT_ROUTE}/users`);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <main className={`${styles.userEditPage} container page`}>
      <h2 className={`pageTitle`}>Edit User</h2>
      {user && <UserEditForm user={user} onSubmit={updatePasswords} />}
    </main>
  );
};

export default UserEditPage;
