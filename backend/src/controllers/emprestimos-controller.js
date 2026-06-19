import db from '../config/db.js';

// GET /emprestimos
export const listarEmprestimos = async (req, res) => {
  try {
    const { leitor_id } = req.query;
    let query = `SELECT e.*, l.titulo AS titulo_livro, u.nome AS nome_leitor
                 FROM Emprestimos e
                 JOIN Livros l ON e.livro_id = l.id_livro
                 JOIN Usuarios u ON e.leitor_id = u.id_usuario`;
    const params = [];
    if (leitor_id) {
      query += ' WHERE e.leitor_id = ?';
      params.push(leitor_id);
    }
    query += ' ORDER BY e.data_emprestimo DESC';

    const [emprestimos] = await db.query(query, params);
    return res.json(emprestimos);
  } catch (error) {
    console.error('Erro ao listar empréstimos:', error);
    return res.status(500).json({ mensagem: 'Erro ao buscar empréstimos.' });
  }
};

// POST /emprestimos
export const criarEmprestimo = async (req, res) => {
  const { livro_id, leitor_id, data_emprestimo, data_devolucao_prevista } = req.body;
  if (!livro_id || !leitor_id || !data_emprestimo || !data_devolucao_prevista) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }
  try {
    const [livros] = await db.query('SELECT * FROM Livros WHERE id_livro = ?', [livro_id]);
    if (livros.length === 0) return res.status(404).json({ mensagem: 'Livro não encontrado.' });
    if (livros[0].quantidade_disponivel <= 0)
      return res.status(400).json({ mensagem: 'Livro indisponível.' });

    const [existente] = await db.query(
      "SELECT * FROM Emprestimos WHERE livro_id = ? AND leitor_id = ? AND status = 'ativo'",
      [livro_id, leitor_id],
    );
    if (existente.length > 0)
      return res.status(400).json({ mensagem: 'Você já possui este livro emprestado.' });

    const [resultado] = await db.query(
      "INSERT INTO Emprestimos (livro_id, leitor_id, data_emprestimo, data_devolucao_prevista, status) VALUES (?, ?, ?, ?, 'ativo')",
      [livro_id, leitor_id, data_emprestimo, data_devolucao_prevista],
    );
    await db.query(
      'UPDATE Livros SET quantidade_disponivel = quantidade_disponivel - 1 WHERE id_livro = ?',
      [livro_id],
    );
    return res
      .status(201)
      .json({ mensagem: 'Empréstimo realizado com sucesso!', id: resultado.insertId });
  } catch (error) {
    console.error('Erro ao criar empréstimo:', error);
    return res.status(500).json({ mensagem: 'Erro ao realizar empréstimo.' });
  }
};

// PUT /emprestimos/:id/devolver
export const devolverEmprestimo = async (req, res) => {
  const { id } = req.params;
  const { data_devolucao_real } = req.body;
  if (!data_devolucao_real)
    return res.status(400).json({ mensagem: 'Data de devolução é obrigatória.' });

  try {
    const [emprestimos] = await db.query('SELECT * FROM Emprestimos WHERE id = ?', [id]);
    if (emprestimos.length === 0)
      return res.status(404).json({ mensagem: 'Empréstimo não encontrado.' });
    if (emprestimos[0].status === 'devolvido')
      return res.status(400).json({ mensagem: 'Este empréstimo já foi devolvido.' });

    await db.query(
      "UPDATE Emprestimos SET status = 'devolvido', data_devolucao_real = ? WHERE id = ?",
      [data_devolucao_real, id],
    );
    await db.query(
      'UPDATE Livros SET quantidade_disponivel = quantidade_disponivel + 1 WHERE id_livro = ?',
      [emprestimos[0].livro_id],
    );
    return res.json({ mensagem: 'Devolução confirmada com sucesso!' });
  } catch (error) {
    console.error('Erro ao devolver:', error);
    return res.status(500).json({ mensagem: 'Erro ao processar devolução.' });
  }
};

// PUT /emprestimos/:id/solicitar-devolucao
export const solicitarDevolucao = async (req, res) => {
  try {
    const [emprestimos] = await db.query('SELECT * FROM Emprestimos WHERE id = ?', [req.params.id]);
    if (emprestimos.length === 0)
      return res.status(404).json({ mensagem: 'Empréstimo não encontrado.' });
    if (emprestimos[0].status !== 'ativo')
      return res.status(400).json({ mensagem: 'Este empréstimo não está ativo.' });
    return res.json({
      mensagem: 'Solicitação de devolução registrada! Aguarde a confirmação do bibliotecário.',
    });
  } catch (error) {
    console.error('Erro ao solicitar devolução:', error);
    return res.status(500).json({ mensagem: 'Erro ao solicitar devolução.' });
  }
};