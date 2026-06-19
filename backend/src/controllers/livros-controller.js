import db from '../config/db.js';

// GET /livros
export const listarLivros = async (req, res) => {
  try {
    const [livros] = await db.query('SELECT * FROM Livros ORDER BY id_livro DESC');
    return res.json(livros);
  } catch (error) {
    console.error('Erro ao listar livros:', error);
    return res.status(500).json({ mensagem: 'Erro ao buscar livros.' });
  }
};

// POST /livros
export const criarLivro = async (req, res) => {
  const { titulo, autor, ano_publicacao, quantidade_disponivel } = req.body;

  if (!titulo || !autor || !quantidade_disponivel) {
    return res.status(400).json({ mensagem: 'Título, autor e quantidade são obrigatórios.' });
  }

  try {
    const [resultado] = await db.query(
      'INSERT INTO Livros (titulo, autor, ano_publicacao, quantidade_disponivel) VALUES (?, ?, ?, ?)',
      [titulo, autor, ano_publicacao || null, quantidade_disponivel]
    );

    return res.status(201).json({
      mensagem: 'Livro cadastrado com sucesso!',
      id_livro: resultado.insertId
    });
  } catch (error) {
    console.error('Erro ao cadastrar livro:', error);
    return res.status(500).json({ mensagem: 'Erro ao cadastrar livro.' });
  }
};

// PUT /livros/:id_livro
export const atualizarLivro = async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, ano_publicacao, quantidade_disponivel } = req.body;

  if (!titulo || !autor || !quantidade_disponivel) {
    return res.status(400).json({ mensagem: 'Título, autor e quantidade são obrigatórios.' });
  }

  try {
    const [resultado] = await db.query(
      'UPDATE Livros SET titulo = ?, autor = ?, ano_publicacao = ?, quantidade_disponivel = ? WHERE id_livro = ?',
      [titulo, autor, ano_publicacao || null, quantidade_disponivel, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Livro não encontrado.' });
    }

    return res.json({ mensagem: 'Livro atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    return res.status(500).json({ mensagem: 'Erro ao atualizar livro.' });
  }
};

// DELETE /livros/:id_livro
export const deletarLivro = async (req, res) => {
  const { id } = req.params;

  try {
    const [emprestimos] = await db.query(
      "SELECT COUNT(*) as total FROM Emprestimos WHERE livro_id = ? AND status = 'ativo'",
      [id]
    );

    if (emprestimos[0].total > 0) {
      return res.status(400).json({
        mensagem: 'Não é possível excluir. Existem empréstimos ativos para este livro.'
      });
    }

    const [resultado] = await db.query('DELETE FROM Livros WHERE id_livro = ?', [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Livro não encontrado.' });
    }

    return res.json({ mensagem: 'Livro removido com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar livro:', error);
    return res.status(500).json({ mensagem: 'Erro ao remover livro.' });
  }
};
