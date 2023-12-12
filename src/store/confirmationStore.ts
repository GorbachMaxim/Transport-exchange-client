import { makeAutoObservable } from 'mobx';

class ConfirmationStore {
  isActiveConfirmation = false;
  isActiveWarning = false;
  title: string = '';
  text: string = '';
  onConfirm: () => void = null!;

  constructor() {
    makeAutoObservable(this);
  }

  show(title: string, text: string, onConfirm: () => void): void {
    this.isActiveConfirmation = true;
    this.title = title;
    this.text = text;
    this.onConfirm = onConfirm;
  }

  showWarning(title: string): void {
    this.isActiveWarning = true;
    this.title = title;
    this.text = '';
  }

  close(): void {
    this.isActiveConfirmation = false;
    this.isActiveWarning = false;
    this.title = '';
    this.text = '';
    this.onConfirm = null!;
  }
}

export default ConfirmationStore;
