<template>
  <div id="tela">
    <div class="formulario-container">
      <transition name="fade" mode="out-in">
        <FormLogin v-if="!mostrarRegistro" @ir-para-registro="mostrarRegistro = true" />
        <FormRegistro v-else @ir-para-login="mostrarRegistro = false" />
      </transition>
    </div>
    <div class="imagem" :style="{ backgroundImage: `url(${fundoLogin})` }"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import fundoLogin from '@/assets/img-login-registrar.webp';
import FormLogin from './FormLogin.vue';
import FormRegistro from './FormRegistro.vue';

const mostrarRegistro = ref(false);
</script>

<style scoped>
#tela {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100dvh;
  background-color: #000000;
}

.formulario-container {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.imagem {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: inset 100px 0 150px #000000;
}


/* TRANSICAO PARA OS CARDS LOGIN/REGISTRO */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>