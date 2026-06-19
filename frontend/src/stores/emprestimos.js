import { defineStore } from 'pinia';
import api from '@/services/api.js';

export const useStoreEmprestimos = defineStore('emprestimos', {
  state: () => ({
    emprestimos: []
  }),

  actions: {
    async buscarEmprestimos() {
      try {
        const { data } = await api.get('/emprestimos');
        
        let emprestimosArray = [];
        if (Array.isArray(data)) {
          emprestimosArray = data;
        } else if (data.emprestimos) {
          emprestimosArray = data.emprestimos;
        } else if (data.data) {
          emprestimosArray = data.data;
        }

        // Garante que cada empréstimo tenha o campo 'id'
        this.emprestimos = emprestimosArray.map(emp => ({
          ...emp,
          id: emp.id // empréstimos já tem 'id' no banco
        }));
      } catch (error) {
        console.error('Erro ao buscar empréstimos:', error);
        this.emprestimos = [];
      }
    }
  }
});
