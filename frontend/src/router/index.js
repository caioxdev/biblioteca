import { createRouter, createWebHistory } from 'vue-router';
import { h } from 'vue';

import Entrar from '@/pages/autenticacao/Entrar.vue';
import LeitorHome from '@/pages/leitor/Leitor.vue';
import BibliotecarioHome from '@/pages/bibliotecario/Bibliotecario.vue';

import CatalogoLeitura from '@/pages/leitor/CatalogoLeitura.vue';
import MeusEmprestimos from '@/pages/leitor/MeusEmprestimos.vue';

import CatalogoGestao from '@/pages/bibliotecario/CatalogoGestao.vue';
import CadastrarLivro from '@/pages/bibliotecario/CadastrarLivro.vue';
import EmprestimosGestao from '@/pages/bibliotecario/EmprestimosGestao.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Entrar,
  },
  {
    path: '/leitor',
    component: LeitorHome,
    meta: { requerAutenticacao: true, perfilIncomativel: 'bibliotecario' },
    redirect: '/leitor/catalogo',
    children: [
      {
        path: 'catalogo',
        name: 'leitor-catalogo',
        component: CatalogoLeitura
      },
      {
        path: 'meus-emprestimos',
        name: 'leitor-emprestimos',
        component: MeusEmprestimos
      }
    ]
  },
  {
    path: '/bibliotecario',
    component: BibliotecarioHome,
    meta: { requerAutenticacao: true, perfilIncomativel: 'leitor' },
    redirect: '/bibliotecario/catalogo',
    children: [
      {
        path: 'catalogo',
        name: 'bibliotecario-catalogo',
        component: CatalogoGestao
      },
      {
        path: 'cadastrar-livro',
        name: 'bibliotecario-cadastrar',
        component: CadastrarLivro
      },
      {
        path: 'emprestimos',
        name: 'bibliotecario-emprestimos',
        component: EmprestimosGestao
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'nao-encontrado',
    component: { render: () => h('h1', { style: 'text-align:center; padding-top:50px;' }, '404 - Página Não Encontrada') }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const usuarioRaw = localStorage.getItem('usuario');

  if (to.meta.requerAutenticacao) {
    if (!token || !usuarioRaw) {
      return next({ name: 'login' });
    }

    const usuario = JSON.parse(usuarioRaw);
    if (to.meta.perfilIncomativel && usuario.perfil === to.meta.perfilIncomativel) {
      return next(usuario.perfil === 'leitor' ? '/leitor' : '/bibliotecario');
    }
  }
  next();
});

export default router;