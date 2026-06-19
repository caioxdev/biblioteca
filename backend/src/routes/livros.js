import { Router } from 'express';
import {
  listarLivros,
  criarLivro,
  atualizarLivro,
  deletarLivro,
} from '../controllers/livros-controller.js';
import { verificarToken } from '../middlewares/auth-middleware.js'
import { verificarPerfil } from '../middlewares/check-perfil.js'

const router = Router();

router.get('/', verificarToken, listarLivros);

router.post('/', verificarToken, verificarPerfil('bibliotecario'), criarLivro);
router.put('/:id', verificarToken, verificarPerfil('bibliotecario'), atualizarLivro);
router.delete('/:id', verificarToken, verificarPerfil('bibliotecario'), deletarLivro);

export default router;
