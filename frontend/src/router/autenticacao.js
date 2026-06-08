export default [
  {
    path: '/',
    name: 'entrar',
    component: () => import('../pages/autenticacao/Entrar.vue'),
    meta: {
      title: 'Login',
      layout: 'default-layout'
    }
  }
];