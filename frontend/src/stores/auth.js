import { defineStore } from 'pinia';

export const useStoreAuth = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    usuario: JSON.parse(localStorage.getItem('usuario')) || null,
    perfil: localStorage.getItem('perfil') || null
  }),

  actions: {
    login(token, usuario) {
      this.token = token;
      this.usuario = usuario;
      this.perfil = usuario.perfil;
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('perfil', usuario.perfil);
    },

    logout() {
      this.token = null;
      this.usuario = null;
      this.perfil = null;
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      localStorage.removeItem('perfil');
    }
  }
});