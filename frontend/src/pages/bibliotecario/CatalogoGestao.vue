<template>
  <main>
    <div class="container-topo">
      <h2>Catálogo de Livros</h2>
      <p>Gerencie o acervo e controle as circulações de obras acadêmicas.</p>
    </div>

    <Tabela
      :colunas="colunasLivros"
      :chaves="chavesLivros"
      :dados="storeLivros.livros"
      textoBotaoPrincipal="Editar"
      textoBotaoSecundario="Excluir"
      @acao-principal="abrirEditarModal"
      @acao-secundaria="excluirLivro"
    />

    <!-- Modal de Edição -->
    <div v-if="isModalAberto" class="modal-overlay">
      <div class="modal-card">
        <h2>Editar Livro</h2>
        <form @submit.prevent="salvarEdicao">
          <div class="form-group">
            <label>Título da Obra</label>
            <input type="text" v-model="livroSelecionado.titulo" required />
          </div>

          <div class="form-group">
            <label>Autor(a)</label>
            <input type="text" v-model="livroSelecionado.autor" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Ano de Publicação</label>
              <input type="number" v-model="livroSelecionado.ano_publicacao" />
            </div>

            <div class="form-group">
              <label>Quantidade Disponível</label>
              <input type="number" v-model="livroSelecionado.quantidade_disponivel" required />
            </div>
          </div>

          <div class="modal-acoes">
            <button type="button" class="btn-cancelar" @click="isModalAberto = false">Cancelar</button>
            <button type="submit" class="btn-salvar">Salvar</button>
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
import { useStoreLivros } from '@/stores/livros'
import api from '@/services/api.js'

const storeLivros = useStoreLivros()
const toast = useToast()

const colunasLivros = ['id', 'título', 'autor', 'ano', 'disponível', 'ações']
const chavesLivros = ['id', 'titulo', 'autor', 'ano_publicacao', 'quantidade_disponivel']

const isModalAberto = ref(false)
const livroSelecionado = ref({
  id: null,
  titulo: '',
  autor: '',
  ano_publicacao: null,
  quantidade_disponivel: null
})

onMounted(() => {
  storeLivros.buscarLivros()
})

const abrirEditarModal = (livro) => {
  livroSelecionado.value = { ...livro }
  isModalAberto.value = true
}

const salvarEdicao = async () => {
  try {
    await api.put(`/livros/${livroSelecionado.value.id}`, livroSelecionado.value)
    toast.success('Livro atualizado com sucesso!')
    isModalAberto.value = false
    storeLivros.buscarLivros() // Recarrega a lista
  } catch (error) {
    toast.error(error.response?.data?.mensagem || 'Erro ao atualizar livro')
  }
}

const excluirLivro = async (livro) => {
  if (!confirm(`Deseja mesmo excluir o livro "${livro.titulo}"?`)) return

  try {
    await api.delete(`/livros/${livro.id}`)
    toast.success('Livro excluído com sucesso!')
    storeLivros.buscarLivros()
  } catch (error) {
    toast.error(error.response?.data?.mensagem || 'Erro ao excluir livro')
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
  font-family: var(--fonte);
  color: var(--cor-preto);
  font-size: var(--f5);
  font-weight: 600;
}

.container-topo p {
  font-family: var(--fonte);
  color: #43474e;
  font-size: var(--f2);
  font-weight: 400;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-card {
  font-family: var(--fonte);
  background-color: #f8fafc;
  width: 100%;
  max-width: 500px;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-card h2 {
  font-size: 1.5rem;
  color: #0f172a;
  margin-bottom: 24px;
  font-weight: 700;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
}

.form-group input {
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #334155;
  background-color: #ffffff;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-row .form-group {
  flex: 1;
}

.modal-acoes {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.modal-acoes button {
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancelar {
  background-color: transparent;
  color: #ef4444;
  border: 1px solid #ef4444;
}

.btn-cancelar:hover {
  background-color: #fef2f2;
}

.btn-salvar {
  background-color: #0f172a;
  color: #ffffff;
  border: 1px solid #0f172a;
}

.btn-salvar:hover {
  background-color: #1e293b;
}
</style>