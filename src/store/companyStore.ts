import { makeAutoObservable } from 'mobx';
import api from '../core/api/api';
import Company, { CompanyCreateData } from '../core/types/company';
import ConfirmationStore from './confirmationStore';

class CompanyStore {
  private companies: Company[] = [];

  constructor(private confirmationStore: ConfirmationStore) {
    makeAutoObservable(this);
  }

  private async deleteCompanyById(id: number): Promise<void> {
    const response = await api.deleteCompanyById(id);

    if (response !== null) {
      this.companies = this.companies.filter((company) => company.id !== id);
    }
  }

  private async deleteMyCompanyPrivate(id: number): Promise<void> {
    const response = await api.deleteMyCompany();

    if (response !== null) {
      this.companies = this.companies.filter((company) => company.id !== id);
    }
  }

  deleteCompany(company: Company): void {
    this.confirmationStore.show(
      'Удалить эту компанию?',
      company.name,
      async () => await this.deleteCompanyById(company.id),
    );
  }

  deleteMyCompany(company: Company): void {
    this.confirmationStore.show(
      'Удалить вашу компанию?',
      company.name,
      async () => {
        await this.deleteMyCompanyPrivate(company.id);
      },
    );
  }

  deleteMyCompanyWithNavigate(company: Company, onConfirm: () => void): void {
    this.confirmationStore.show(
      'Удалить вашу компанию?',
      company.name,
      async () => {
        await this.deleteMyCompanyPrivate(company.id);
        onConfirm();
      },
    );
  }

  async fetchCompanies(): Promise<void> {
    const fetchedCompanies = await api.fetchCompanies();

    if (fetchedCompanies !== null) {
      this.companies = fetchedCompanies;
    }
  }

  async fetchCompanyById(id: number): Promise<Company | null> {
    return await api.fetchCompanyById(id);
  }

  async fetchMyCompany(): Promise<Company | null> {
    return await api.fetchMyCompany();
  }

  async createMyCompany(company: CompanyCreateData): Promise<void> {
    const response = await api.createMyCompany(company);

    // if (response !== null) {
    //   this.companies = [...this.companies, response];
    // }
  }

  async updateMyCompany(company: Company): Promise<Company | null> {
    return await api.updateMyCompany(company);
  }

  // async searchBooks(search: string): Promise<void> {
  //   const fetchedBooks = await api.fetchSearchBooks(search);
  //   console.log(fetchedBooks);
  //   if (fetchedBooks !== null) {
  //     this.books = fetchedBooks;
  //   }
  // }

  getCompanies() {
    return this.companies;
  }
}

export default CompanyStore;
