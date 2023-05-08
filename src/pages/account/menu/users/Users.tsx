import React, { useEffect } from 'react';
import styles from './Users.module.scss';
import { useStore } from '../../../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import { GENRES_ROUTE, USERS_ROUTE } from '../../../../core/constants/routes';
import { observer } from 'mobx-react';
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete-icon.svg';
import Button from '../../../../components/ui/button/Button';
import User from '../../../../core/types/user';

const Users = observer(() => {
  const clientStore = useStore('ClientStore');
  const navigate = useNavigate();

  const fetchClients = async (): Promise<void> => {
    await clientStore.fetchClients();
  };

  const toEditPage = (clientId: number): void => {
    navigate(`${USERS_ROUTE}/edit/${clientId}`);
  };

  const deleteClient = async (client: User): Promise<void> => {
    await clientStore.deleteClient(client);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <section className={styles.clients}>
      <h2 className={`accountPageTitle`}>Users</h2>
      <ul className={styles.authorsList}>
        <li className={styles.headers}>
          <div className={styles.indexHeader}>
            <span>#</span>
          </div>
          <div className={styles.nameHeader}>
            <span>name</span>
          </div>
          <div className={styles.emailHeader}>
            <span>email</span>
          </div>
          <div className={styles.idHeader}>
            <span>ID</span>
          </div>
        </li>
        {clientStore.getClients().length > 0 ? (
          clientStore.getClients().map((client, index) => (
            <li className={styles.authorItem} key={client.id}>
              <span className={styles.authorIndex}>{index + 1}</span>
              <span className={styles.authorName}>{client.username}</span>
              <span className={styles.authorEmail}>{client.email}</span>
              <span className={styles.authorId}>{client.id}</span>
              <button
                className={styles.editBtn}
                onClick={() => toEditPage(client.id)}
              >
                <EditIcon />
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => deleteClient(client)}
              >
                <DeleteIcon />
              </button>
            </li>
          ))
        ) : (
          <div>There are no users</div>
        )}
      </ul>
    </section>
  );
});

export default Users;
