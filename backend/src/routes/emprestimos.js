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

router.get('/', verificarToken, listarEmprestimos);

router.post('/', verificarToken, verificarPerfil('leitor'), criarEmprestimo);

router.put('/:id/devolver', verificarToken, verificarPerfil('bibliotecario'), devolverEmprestimo);

router.put('/:id/solicitar-devolucao', verificarToken, verificarPerfil('leitor'), solicitarDevolucao);

export default router;