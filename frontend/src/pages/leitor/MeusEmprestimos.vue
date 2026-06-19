<template>
  <main>
    <div class="container-topo">
      <h2>Meus Empréstimos</h2>
      <p>Acompanhe o prazo das suas obras locadas e solicite a devolução.</p>
    </div>

    <Tabela
      :colunas="colunasMeusEmprestimos"
      :chaves="chavesMeusEmprestimos"
      :dados="meusEmprestimos"
      textoBotaoPrincipal="Solicitar Devolução"
      corBotaoPrincipal="azul-escuro"
      :mostrar-botao-secundario="false"
      @acao-principal="solicitarDevolucao"
    />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import Tabela from '../../components/Tabela.vue'
import api from '@/services/api.js'

const toast = useToast()

const colunasMeusEmprestimos = ['livro', 'data prevista', 'status', 'ações']
const chavesMeusEmprestimos = ['titulo_livro', 'data_devolucao_prevista', 'status']

const meusEmprestimos = ref([])

onMounted(async () => {
  await buscarMeusEmprestimos()
})

const buscarMeusEmprestimos = async () => {
  try {
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    const resposta = await api.get(`/emprestimos?leitor_id=${usuario.id}`)
    
    // Garante que sempre seja um Array
    const dados = resposta.data
    if (Array.isArray(dados)) {
      meusEmprestimos.value = dados
    } else if (dados.emprestimos) {
      meusEmprestimos.value = dados.emprestimos
    } else if (dados.data) {
      meusEmprestimos.value = dados.data
    } else {
      meusEmprestimos.value = []
    }
  } catch (error) {
    meusEmprestimos.value = []
  }
}

const solicitarDevolucao = async (item) => {
  if (!confirm(`Deseja solicitar devolução de "${item.titulo_livro}"?`)) return

  try {
    await api.put(`/emprestimos/${item.id}/solicitar-devolucao`)
    toast.success('Devolução solicitada! Aguarde aprovação do bibliotecário.')
    buscarMeusEmprestimos()
  } catch (error) {
    toast.error(error.response?.data?.mensagem || 'Erro ao solicitar devolução')
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
  color: var(--cor-preto, #000000);
  font-size: var(--f5, 1.8rem);
  font-weight: 600;
}

.container-topo p {
  font-family: var(--fonte, sans-serif);
  color: #43474e;
  font-size: var(--f2, 0.95rem);
  font-weight: 400;
}
</style>
