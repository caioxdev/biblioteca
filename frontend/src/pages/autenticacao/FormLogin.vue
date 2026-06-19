<template>
  <form @submit.prevent="entrar" class="formulario">
    <h1>
      Faça seu Login
      <span>.</span>
    </h1>
    <div class="campo">
      <label>Email</label>
      <input type="email" v-model="email" />
    </div>
    <div class="campo">
      <label>Senha</label>
      <input type="password" v-model="senha" />
    </div>
    <a class="esqueci-senha">Esqueci minha senha</a>
    <button id="btn-entrar">Entrar</button>
    <button type="button" class="link" @click="$emit('ir-para-registro')">Ainda não tenho uma conta</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import api from '@/services/api.js';

const emit = defineEmits(['ir-para-registro']);
const toast = useToast();
const router = useRouter();

const email = ref('');
const senha = ref('');

const entrar = async () => {
  if (!email.value || !senha.value) {
    toast.warning('Por favor, preencha o e-mail e a senha!');
    return;
  }

  try {
    const resposta = await api.post('/auth/login', {
      email: email.value,
      senha: senha.value
    })

    localStorage.setItem('token', resposta.data.token);

    localStorage.setItem('usuario', JSON.stringify(resposta.data.usuario));

    toast.success(`Bem-vindo, ${resposta.data.usuario.nome}!`);

    if (resposta.data.usuario.perfil === 'bibliotecario') {
      router.push('/bibliotecario');
    } else {
      router.push('/leitor');
    }

    email.value = '';
    senha.value = '';

    console.log('Usuário logado com perfil:', resposta.data.usuario.perfil)
  } catch (error) {
    const mensagemErro = error.response?.data?.mensagem || 'Erro ao realizar o login.'
    toast.error(mensagemErro)
  }
}
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
  letter-spacing: 7.2px;
  text-align: center;
  margin-bottom: 50px;
}

h1 span {
  color: #4a90d9;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 477px;
}

.campo:first-of-type {
  margin-bottom: 30px;
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

#btn-entrar {
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
  margin-bottom: 12px;
}

#btn-entrar:hover {
  animation: degradeHorizontal 0.9s ease forwards;
}
</style>
