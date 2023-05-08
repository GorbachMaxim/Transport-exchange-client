import { makeAutoObservable } from 'mobx';
import User, { AuthData, UpdatePassword } from '../core/types/user';
import api from '../core/api/api';
import ConfirmationStore from './confirmationStore';

class UserStore {
  private clients: User[] = [];

  constructor(private confirmationStore: ConfirmationStore) {
    makeAutoObservable(this);
  }

  async fetchClients(): Promise<void> {
    const fetchedClients = await api.fetchUsers();

    if (fetchedClients !== null) {
      this.clients = fetchedClients;
    }
  }

  async fetchClientById(id: number): Promise<User | null> {
    return await api.fetchUserById(id);
  }

  async updatePassword(passwords: UpdatePassword): Promise<void> {
    await api.updatePassword(passwords);
  }

  async deleteClientById(id: number): Promise<void> {
    const response = await api.deleteUserById(id);

    if (response !== null) {
      this.clients = this.clients.filter((client) => client.id !== id);
    }
  }

  deleteClient(client: User): void {
    this.confirmationStore.show(
      'Delete this user?',
      client.username,
      async () => await this.deleteClientById(client.id),
    );
  }

  getClients() {
    return this.clients;
  }
}

export default UserStore;
