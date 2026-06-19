import { defineStore } from 'pinia';
import api from '@/services/api.js';

export const useStoreLivros = defineStore('livros', {
  state: () => ({
    livros: []
  }),

  actions: {
    async buscarLivros() {
      try {
        const { data } = await api.get('/livros');
        
        let livrosArray = [];
        if (Array.isArray(data)) {
          livrosArray = data;
        } else if (data.livros) {
          livrosArray = data.livros;
        } else if (data.data) {
          livrosArray = data.data;
        }

        this.livros = livrosArray.map(livro => ({
          ...livro,
          id: livro.id_livro || livro.id
        }));
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
        this.livros = [];
      }
    }
  }
});
