<template>
  <form @submit.prevent="registrar" class="formulario">
    <h1>Criar uma conta<span>.</span></h1>
    <div class="toggle">
      <div class="slider" :class="{ direita: perfil === 'bibliotecario' }"></div>
      <span @click="perfil = 'leitor'" :class="{ ativo: perfil === 'leitor' }">Leitor</span>
      <span @click="perfil = 'bibliotecario'" :class="{ ativo: perfil === 'bibliotecario' }">Bibliotecário</span>
    </div>
    <div class="campo">
      <label>Nome</label>
      <input type="text" v-model="nome" />
    </div>
    <div class="campo">
      <label>Email</label>
      <input type="email" v-model="email" />
    </div>
    <div class="campo">
      <label>Senha</label>
      <input type="password" v-model="senha" />
    </div>
    <button id="btn-registrar">Criar conta</button>
    <button type="button" class="link" @click="$emit('ir-para-login')">Já tenho uma conta</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import api from '@/services/api.js';

const emit = defineEmits(['ir-para-login']);
const toast = useToast();

const nome = ref('');
const email = ref('');
const senha = ref('');
const perfil = ref('leitor');

const registrar = async () => {
  if (!nome.value || !email.value || !senha.value) {
    toast.warning('Por favor, preencha todos os campos obrigatórios!');
    return;
  }

  try {
    const resposta = await api.post('/auth/registro', {
      nome: nome.value,
      email: email.value,
      senha: senha.value,
      perfil: perfil.value
    });

    toast.success(resposta.data.mensagem || 'Conta criada com sucesso!');

    nome.value = '';
    email.value = '';
    senha.value = '';

    setTimeout(() => {
      emit('ir-para-login');
    }, 800);

  } catch (error) {
    const mensagemErro = error.response?.data?.mensagem || 'Erro ao realizar o cadastro.';
    toast.error(mensagemErro);
  }
};
</script>

<style scoped>
.formulario {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  gap: 20px;
}

h1 {
  font-family: var(--fonte-login);
  font-size: var(--f6);
  color: var(--cor-branco);
  font-weight: 700;
  letter-spacing: 4.7px;
  text-align: center;
  margin-bottom: 35px;
}

h1 span {
  color: #4a90d9;
}

.toggle {
  position: relative;
  display: flex;
  background-color: #111;
  border-radius: 16px;
  padding: 4px;
  width: 477px;
  cursor: pointer;
}

.slider {
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  background: linear-gradient(92deg, #001B3C 22.21%, #233D62 82.71%, #0E2C5B 100%);
  border-radius: 16px;
  transition: transform 0.3s ease;
}

.slider.direita {
  transform: translateX(100%);
}

.toggle span {
  flex: 1;
  text-align: center;
  padding: 8px 0;
  font-family: var(--fonte-login);
  font-size: var(--f2);
  font-weight: 600;
  color: #8691A6;
  z-index: 1;
  transition: color 0.3s;
}

.toggle span.ativo {
  color: var(--cor-branco);
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 477px;
}


.campo label {
  font-family: var(--fonte-login);
  font-size: var(--f2);
  color: var(--cor-branco);
}

.campo input {
  background: transparent;
  border: 1px solid transparent;
  background-image: linear-gradient(#000000, #000000), linear-gradient(90deg, #173156 0%, #001b3c 34%, #435671 70%, #8691a6 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 16px;
  padding: 14px 16px;
  color: var(--cor-branco);
  font-family: var(--fonte-login);
  font-size: var(--f2);
  width: 477px;
  height: 65px;
}

.campo input:focus {
  outline: none;
}

.esqueci-senha {
  font-family: var(--fonte-login);
  font-size: var(--f2);
  color: var(--cor-branco);
  text-decoration: underline;
  text-align: right;
  cursor: pointer;
  width: 477px;
  display: block;
  margin: 12px 0;
}

.link {
  font-family: var(--fonte-login);
  font-size: var(--f2);
  color: var(--cor-branco);
  text-decoration: underline;
  background: none;
  text-align: center;
  cursor: pointer;
}

#btn-registrar {
  background: linear-gradient(92deg, #001b3c 22.21%, #233d62 82.71%, #0e2c5b 100%);
  background-size: 100% 100%;
  color: var(--cor-branco);
  font-family: var(--fonte-login);
  font-size: var(--f3);
  font-weight: 600;
  padding: 16px;
  border-radius: 16px;
  width: 477px;
  height: 65px;
  margin: 12px 0;
}

#btn-registrar:hover {
  animation: degradeHorizontal .9s ease forwards;
}
</style>