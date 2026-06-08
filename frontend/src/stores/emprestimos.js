import { defineStore } from 'pinia';
import axios from 'axios';

export const useStoreEmprestimos = defineStore('emprestimos', {
  state: () => ({
    emprestimos: []
  }),

  actions: {
    async buscarEmprestimos() {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/emprestimos`);
      this.emprestimos = data;
    }
  }
});