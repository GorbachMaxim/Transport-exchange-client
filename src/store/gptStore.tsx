import { makeAutoObservable } from 'mobx';
import api from '../core/api/api';
import GptAdvice from '../core/types/gptAdvice';

class gptStore {
  private gptAdvice: GptAdvice = null!;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchGptAdvice(): Promise<void> {
    const gptAdvice = await api.getGPTAdvice();

    if (gptAdvice !== null) {
      this.gptAdvice = gptAdvice;
    }
  }

  getGptAdvice() {
    return this.gptAdvice;
  }
}

export default gptStore;
