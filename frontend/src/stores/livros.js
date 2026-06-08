import { defineStore } from 'pinia';
import axios from 'axios';

export const useStoreLivros = defineStore('livros', {
  state: () => ({
    livros: []
  }),

  actions: {
    async buscarLivros() {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/livros`);
      this.livros = data;
    }
  }
});