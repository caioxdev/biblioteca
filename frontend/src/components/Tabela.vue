<script setup>
import dayjs from 'dayjs'

defineProps({
  colunas: {
    type: Array,
    required: true
  },
  dados: {
    type: Array,
    required: true
  },
  chaves: {
    type: Array,
    required: true
    },
  mostrarBotaoPrincipal: {
    type: Boolean,
    default: true
  },
  textoBotaoPrincipal: {
    type: String,
    default: 'Atualizar'
  },
  mostrarBotaoSecundario: {
    type: Boolean,
    default: true
  },
  textoBotaoSecundario: {
    type: String,
    default: 'Aprovar'
  },
  inverterBotoes: {
    type: Boolean,
    default: false
  },
  corBotaoPrincipal: {
    type: String,
    default: 'escuro'
  },
  corBotaoSecundario: {
    type: String,
    default: 'vermelho'
  }
})

const emit = defineEmits(['acao-principal', 'acao-secundaria'])

const isTitulo = (chave) => ['titulo', 'livro_emprestado', 'livro', 'titulo_livro'].includes(chave)

const formatarValor = (chave, valor) => {
  if (!valor) return ''
  if (chave.includes('data')) return dayjs(valor).format('DD/MM/YYYY')
  return valor
}
</script>

<template>
  <div class="container-tabela">
    <table>
      <thead>
        <tr>
          <th v-for="coluna in colunas" :key="coluna">{{ coluna }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="dados.length === 0">
          <td :colspan="colunas.length" class="tabela-vazia">Nenhum registro encontrado.</td>
        </tr>
        <tr v-else v-for="(item, index) in dados" :key="item.id || index">
          <td v-for="chave in chaves" :key="chave">
            <span v-if="chave === 'id'" class="txt-id">#{{ item[chave] }}</span>
            <strong v-else-if="isTitulo(chave)">{{ item[chave] }}</strong>
            <span v-else-if="chave === 'quantidade_disponivel'">{{ item[chave] || 0 }} UN</span>
            <span v-else>{{ formatarValor(chave, item[chave]) }}</span>
          </td>
          <td v-if="colunas.includes('ações') || colunas.includes('Ações')">
            <div :class="['acoes', { invertido: inverterBotoes }]">
              <button v-if="mostrarBotaoPrincipal" :class="['btn-base', corBotaoPrincipal]" :disabled="item.quantidade_disponivel === 0" @click="emit('acao-principal', item)">
                {{ textoBotaoPrincipal }}
              </button>
              <button v-if="mostrarBotaoSecundario" :class="['btn-base', corBotaoSecundario]" @click="emit('acao-secundaria', item)">
                {{ textoBotaoSecundario }}
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container-tabela {
  width: 100%;
  margin: 20px auto;
  font-family: 'Segoe UI', Roboto, sans-serif;
}
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
th {
  background: #f8fafc;
  color: #64748b;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 16px 24px;
  text-align: left;
  border-bottom: 2px solid #e2e8f0;
}
td {
  padding: 18px 24px;
  color: #334155;
  font-size: 0.9rem;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}
tr:last-child td {
  border-bottom: none;
}
td:first-child {
  color: #94a3b8;
  font-weight: 500;
}
td strong {
  color: #1e293b;
  font-weight: 600;
}
.tabela-vazia {
  text-align: center;
  color: #94a3b8;
  font-style: italic;
  padding: 40px 20px;
}
.acoes {
  display: flex;
  gap: 8px;
}
.acoes.invertido {
  flex-direction: row-reverse;
  justify-content: flex-end;
}
.btn-base {
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-base:disabled {
  background-color: #94a3b8 !important;
  border-color: #94a3b8 !important;
  color: #fff !important;
  opacity: 0.6;
  cursor: not-allowed;
}
.btn-base.escuro {
  background: #0f172a;
  color: #fff;
  border: 1px solid #0f172a;
}
.btn-base.escuro:hover {
  background: #1e293b;
}
.btn-base.vermelho {
  background: transparent;
  color: #ef4444;
  border: 1px solid #fca5a5;
}
.btn-base.vermelho:hover {
  background: #fef2f2;
}
.btn-base.azul-escuro {
  background: #002045;
  color: #fff;
  border: 1px solid #002045;
}
.btn-base.azul-escuro:hover {
  background: #00142c;
}
.btn-base.transparente {
  background: transparent;
  color: #475569;
  border: 1px solid #cbd5e1;
}
.btn-base.transparente:hover {
  background: #f1f5f9;
}
</style>