import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Entrar from '@/pages/autenticacao/Entrar.vue';
import LeitorHome from '@/pages/leitor/Leitor.vue';
import BibliotecarioHome from '@/pages/bibliotecario/Bibliotecario.vue';

import CatalogoLeitura from '@/pages/leitor/CatalogoLeitura.vue';
import MeusEmprestimos from '@/pages/leitor/MeusEmprestimos.vue';

import CatalogoGestao from '@/pages/bibliotecario/CatalogoGestao.vue';
import CadastrarLivro from '@/pages/bibliotecario/CadastrarLivro.vue';
import EmprestimosGestao from '@/pages/bibliotecario/EmprestimosGestao.vue';

NProgress.configure({ showSpinner: false });

const routes = [
  {
    path: '/',
    name: 'login',
    component: Entrar,
    meta: {
      title: 'Login',
      layout: 'default-layout'
    }
  },
  {
    path: '/leitor',
    component: LeitorHome,
    meta: { requerAutenticacao: true, perfilIncomativel: 'bibliotecario', layout: 'navbar-layout' },
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
    meta: { requerAutenticacao: true, perfilIncomativel: 'leitor', layout: 'navbar-layout' },
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
    path: '/erro',
    name: 'erro',
    component: () => import('../pages/erro/Erro.vue'),
    meta: {
      title: 'Página não encontrada',
      layout: 'default-layout'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/erro'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// BARRA DE NAVEGACAO
router.beforeEach((to, from, next) => {
  NProgress.start();

  const token = localStorage.getItem('token');
  const usuarioRaw = localStorage.getItem('usuario');

  if (to.meta.title) {
    document.title = to.meta.title;
  }

  if (to.meta.requerAutenticacao) {
    if (!token || !usuarioRaw) {
      NProgress.done();
      return next({ name: 'login' });
    }

    const usuario = JSON.parse(usuarioRaw);
    if (to.meta.perfilIncomativel && usuario.perfil === to.meta.perfilIncomativel) {
      NProgress.done();
      return next(usuario.perfil === 'leitor' ? '/leitor' : '/bibliotecario');
    }
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;