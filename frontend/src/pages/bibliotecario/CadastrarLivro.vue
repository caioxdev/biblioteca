<template>
  <main class="cadastro-container">
    <div class="container-topo">
      <h2>Cadastrar Novo Livro</h2>
      <p>Insira as informações técnicas para disponibilizar a obra no acervo da universidade.</p>
    </div>

    <div class="formulario-card">
      <form @submit.prevent="lidarComCadastro">

        <div class="form-group">
          <label for="titulo">Título da Obra</label>
          <input
            id="titulo"
            type="text"
            v-model="novoLivro.titulo"
            placeholder="Ex: Cálculo Diferencial e Integral"
            required
          />
        </div>

        <div class="form-group">
          <label for="autor">Autor(a)</label>
          <input
            id="autor"
            type="text"
            v-model="novoLivro.autor"
            placeholder="Ex: James Stewart"
            required
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="ano">Ano de Publicação</label>
            <input
              id="ano"
              type="number"
              v-model="novoLivro.ano_publicacao"
              placeholder="2026"
              required
            />
          </div>

          <div class="form-group">
            <label for="quantidade">Quantidade Inicial</label>
            <input
              id="quantidade"
              type="number"
              v-model="novoLivro.quantidade_disponivel"
              placeholder="10"
              required
            />
          </div>
        </div>

        <div class="form-acoes">
          <button type="button" class="btn-cancelar" @click="cancelarCadastro">
            Cancelar
          </button>
          <button type="submit" class="btn-cadastrar">
            Cadastrar Livro
          </button>
        </div>

      </form>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import api from '@/services/api.js'

const toast = useToast()
const router = useRouter()

const novoLivro = ref({
  titulo: '',
  autor: '',
  ano_publicacao: null,
  quantidade_disponivel: null
})

const lidarComCadastro = async () => {
  try {
    await api.post('/livros', novoLivro.value)
    toast.success('Livro cadastrado com sucesso!')
    limparFormulario()
    router.push('/bibliotecario/catalogo')
  } catch (error) {
    toast.error(error.response?.data?.mensagem || 'Erro ao cadastrar livro')
  }
}

const limparFormulario = () => {
  novoLivro.value = {
    titulo: '',
    autor: '',
    ano_publicacao: null,
    quantidade_disponivel: null
  }
}

const cancelarCadastro = () => {
  if (confirm('Deseja mesmo cancelar? Os dados serão perdidos.')) {
    limparFormulario()
    router.push('/bibliotecario/catalogo')
  }
}
</script>

<style scoped>
.container-topo {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;

  h2 {
    font-family: var(--fonte);
    color: var(--cor-preto);
    font-size: var(--f5);
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  p {
    font-family: var(--fonte);
    color: #43474E;
    font-size: var(--f2);
    font-style: normal;
    font-weight: 400;
    font-weight: 400;
    line-height: 143%;
  }
}

.formulario-card {
  font-family: var(--fonte);
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 40px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.form-group label {
  font-family: var(--fonte, sans-serif);
  font-size: 0.9rem;
  font-weight: 600;
  color: #475569;
}

.form-group input {
  padding: 12px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  color: #334155;
  background-color: #ffffff;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #0f172a;
}

.form-row {
  display: flex;
  gap: 24px;
}

.form-row .form-group {
  flex: 1;
}

.form-acoes {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 32px;
}

.form-acoes button {
  padding: 12px 28px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancelar {
  background-color: #ffffff;
  color: #475569;
  border: 1px solid #cbd5e1;
}

.btn-cancelar:hover {
  background-color: #f1f5f9;
}

.btn-cadastrar {
  background-color: #001f3f;
  color: #ffffff;
  border: 1px solid #001f3f;
}

.btn-cadastrar:hover {
  background-color: #001124;
}
</style>