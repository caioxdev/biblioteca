<template>
  <main>
    <div class="container-topo">
      <h2>Circulação e Empréstimos</h2>
      <p>Gerencie o acervo e controle as circulações de obras acadêmicas.</p>
    </div>

    <Tabela :colunas="colunasEmprestimos" :chaves="chavesEmprestimos" :dados="storeEmprestimos.emprestimos" textoBotaoPrincipal="Atualizar" corBotaoPrincipal="transparente" textoBotaoSecundario="Aprovar" corBotaoSecundario="azul-escuro" :inverter-botoes="true" @acao-principal="abrirModalStatus" @acao-secundaria="aprovarDevolucao" />

    <div v-if="isModalAberto" class="modal-overlay">
      <div class="modal-card">
        <h2>Atualizar Status</h2>
        <div class="info-contexto">
          <p><strong>Leitor:</strong> {{ emprestimoSelecionado.nome_leitor }}</p>
          <p><strong>Obra:</strong> {{ emprestimoSelecionado.titulo_livro }}</p>
        </div>
        <form @submit.prevent="salvarStatus">
          <div class="form-group">
            <label>Selecione o novo status</label>
            <select v-model="emprestimoSelecionado.status" class="select-status">
              <option value="ativo">Ativo</option>
              <option value="devolvido">Devolvido</option>
              <option value="atrasado">Atrasado</option>
            </select>
          </div>
          <div class="modal-acoes">
            <button type="button" class="btn-cancelar" @click="isModalAberto = false">Cancelar</button>
            <button type="submit" class="btn-salvar">Salvar Alteração</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import Tabela from '../../components/Tabela.vue'
import { useStoreEmprestimos } from '@/stores/emprestimos'
import api from '@/services/api.js'
import dayjs from 'dayjs'

const storeEmprestimos = useStoreEmprestimos()
const toast = useToast()

const colunasEmprestimos = ['id', 'leitor', 'livro', 'data empréstimo', 'data prevista', 'status', 'ações']
const chavesEmprestimos = ['id', 'nome_leitor', 'titulo_livro', 'data_emprestimo', 'data_devolucao_prevista', 'status']

const isModalAberto = ref(false)
const emprestimoSelecionado = ref({ id: null, nome_leitor: '', titulo_livro: '', status: '' })

onMounted(() => storeEmprestimos.buscarEmprestimos())

const abrirModalStatus = (emprestimo) => {
  emprestimoSelecionado.value = { ...emprestimo }
  isModalAberto.value = true
}

const confirmarDevolucao = async (id, titulo) => {
  if (!confirm(`Confirmar devolução de "${titulo}"?`)) return
  await api.put(`/emprestimos/${id}/devolver`, {
    data_devolucao_real: dayjs().format('YYYY-MM-DD')
  })
  toast.success('Devolução aprovada com sucesso!')
  storeEmprestimos.buscarEmprestimos()
}

const aprovarDevolucao = (emp) => confirmarDevolucao(emp.id, emp.titulo_livro)

const salvarStatus = async () => {
  try {
    await confirmarDevolucao(emprestimoSelecionado.value.id, emprestimoSelecionado.value.titulo_livro)
    isModalAberto.value = false
  } catch (error) {
    toast.error(error.response?.data?.mensagem || 'Erro ao atualizar status')
  }
}
</script>

<style scoped>
.container-topo {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.container-topo h2 {
  font-family: var(--fonte, sans-serif);
  color: var(--cor-preto);
  font-size: var(--f5);
  font-weight: 600;
}

.container-topo p {
  font-family: var(--fonte, sans-serif);
  color: #43474e;
  font-size: var(--f2);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-card {
  font-family: var(--fonte);
  background: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-card h2 {
  margin-bottom: 20px;
  color: #1e293b;
  font-size: 1.4rem;
  font-weight: 700;
}

.info-contexto {
  background: #f1f5f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.info-contexto p {
  font-size: 0.9rem;
  margin: 5px 0;
  color: #475569;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
}

.select-status {
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  font-size: 1rem;
}

.modal-acoes {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 25px;
}

.modal-acoes button {
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  border: none;
}

.btn-cancelar {
  background: #f1f5f9;
  color: #475569;
}

.btn-salvar {
  background: #002045;
  color: #fff;
}
</style>