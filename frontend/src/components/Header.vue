<template>
  <div class="container-header">
    <div class="content-esq">
      <img :src="logo" alt="Logo LibreBR" />
      <h1>LibreBR</h1>
    </div>
    <div class="content-dir">
      <p>Olá, {{ nomeUsuario }}</p>
      <button @click="fazerLogout" class="btn-sair">Sair</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import logo from '@/assets/logo.svg'

const router = useRouter()
const nomeUsuario = ref('[Usuário]')

onMounted(() => {
  const usuarioRaw = localStorage.getItem('usuario')
  if (usuarioRaw) {
    const usuario = JSON.parse(usuarioRaw)
    nomeUsuario.value = usuario.nome
  }
})

const fazerLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')

  router.push('/')
}
</script>

<style scoped>
.container-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.563rem 2.5rem;
  height: 100%;
  box-sizing: border-box;
}

.content-esq {
  display: flex;
  align-items: center;
  gap: 20px;
}

.content-esq h1 {
  font-family: var(--fonte);
  color: var(--cor-preto);
  font-size: var(--f4);
  font-weight: 700;
  line-height: normal;
}

.content-dir {
  display: flex;
  align-items: center;
  gap: 20px;

  p {
    font-family: var(--fonte);
    color: var(--cor-preto);
    font-size: var(--fonte-padrao);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .btn-sair {
    padding: 0.375rem 1rem;
    border-radius: 4px;
    border: 1px solid #74777f;
    background: transparent;

    font-family: var(--fonte);
    color: var(--cor-texto-principal);
    font-size: var(--f1);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-sair:hover {
    background-color: #f0f0f0;
  }
}
</style>