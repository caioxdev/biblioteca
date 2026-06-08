import { Router } from 'express';
import {
  listarEmprestimos,
  criarEmprestimo,
  devolverEmprestimo,
} from '../controllers/emprestimos-controller.js';
import { verificarToken } from '../middlewares/auth-middleware.js'
import { verificarPerfil } from '../middlewares/check-perfil.js'

const router = Router();

router.get('/', verificarToken, listarEmprestimos);
router.post('/', verificarToken, verificarPerfil('leitor'), criarEmprestimo);
router.put('/:id/devolver', verificarToken, verificarPerfil('bibliotecario'), devolverEmprestimo);

export default router;