import { Router } from 'express';
import {
  listarEmprestimos,
  criarEmprestimo,
  devolverEmprestimo,
  solicitarDevolucao,
} from '../controllers/emprestimos-controller.js';
import { verificarToken } from '../middlewares/auth-middleware.js'
import { verificarPerfil } from '../middlewares/check-perfil.js'

const router = Router();

// Listar empréstimos (qualquer usuário autenticado)
router.get('/', verificarToken, listarEmprestimos);

// Criar empréstimo (só leitor)
router.post('/', verificarToken, verificarPerfil('leitor'), criarEmprestimo);

// Confirmar devolução (só bibliotecário)
router.put('/:id/devolver', verificarToken, verificarPerfil('bibliotecario'), devolverEmprestimo);

// Solicitar devolução (só leitor)
router.put('/:id/solicitar-devolucao', verificarToken, verificarPerfil('leitor'), solicitarDevolucao);

export default router;
