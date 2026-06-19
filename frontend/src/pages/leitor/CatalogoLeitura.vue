<template>
  <main>
    <div class="container-topo">
      <h2>Catálogo de Livros</h2>
      <p>Consulte as obras disponíveis no acervo e solicite novos empréstimos.</p>
    </div>

    <Tabela
      :colunas="colunasCatalogo"
      :chaves="chavesCatalogo"
      :dados="storeLivros.livros"
      textoBotaoPrincipal="Solicitar Empréstimo"
      corBotaoPrincipal="azul-escuro"
      :mostrar-botao-secundario="false"
      @acao-principal="solicitarEmprestimo"
    />
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import Tabela from '../../components/Tabela.vue'
import { useStoreLivros } from '@/stores/livros'
import api from '@/services/api.js'
import dayjs from 'dayjs'

const storeLivros = useStoreLivros()
const toast = useToast()

const colunasCatalogo = ['id', 'título', 'autor', 'ano', 'disponível', 'ações']
const chavesCatalogo = ['id', 'titulo', 'autor', 'ano_publicacao', 'quantidade_disponivel']

onMounted(() => {
  storeLivros.buscarLivros()
})

const solicitarEmprestimo = async (livro) => {
  if (livro.quantidade_disponivel <= 0) {
    toast.error('Livro indisponível no momento')
    return
  }

  try {
    const usuario = JSON.parse(localStorage.getItem('usuario'))

    // Usando dayjs para datas
    const hoje = dayjs().format('YYYY-MM-DD')
    const devolucaoPrevista = dayjs().add(7, 'day').format('YYYY-MM-DD')

    await api.post('/emprestimos', {
      livro_id: livro.id,
      leitor_id: usuario.id,
      data_emprestimo: hoje,
      data_devolucao_prevista: devolucaoPrevista
    })

    toast.success(`Empréstimo de "${livro.titulo}" solicitado!`)
    storeLivros.buscarLivros()
  } catch (error) {
    toast.error(error.response?.data?.mensagem || 'Erro ao solicitar empréstimo')
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
  line-height: 143%;
}
</style>