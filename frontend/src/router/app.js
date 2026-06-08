export default [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/erro'
  },
  {
    path: '/erro',
    name: 'erro',
    component: () => import('../pages/erro/Erro.vue'),
    meta: {
      title: 'Página não encontrada',
      layout: 'default-layout'
    }
  },
  {
    path: '/bibliotecario',
    name: 'bibliotecario',
    component: () => import('../pages/bibliotecario/Bibliotecario.vue'),
    meta: {
      logged: true,
      title: 'Painel do Bibliotecário',
      layout: 'navbar-layout'
    }
  },
  {
    path: '/leitor',
    name: 'leitor',
    component: () => import('../pages/leitor/Leitor.vue'),
    meta: {
      logged: true,
      title: 'Painel do Leitor',
      layout: 'navbar-layout'
    }
  }
]