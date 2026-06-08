import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../config/db.js';

export const registrarUsuario = async (req, res) => {
  const { nome, email, senha, perfil } = req.body;

  if (!nome || !email || !senha || !perfil) {
    return res.status(400).json({
      mensagem: 'Todos os campos são obrigatórios.',
    });
  }

  const perfisValidos = ['leitor', 'bibliotecario'];

  if (!perfisValidos.includes(perfil.toLowerCase())) {
    return res.status(400).json({
      mensagem: 'Perfil inválido.',
    });
  }

  try {
    const [usuarios] = await db.query(
      'SELECT id_usuario FROM Usuarios WHERE email = ?',
      [email]
    );

    if (usuarios.length) {
      return res.status(400).json({
        mensagem: 'E-mail já cadastrado.',
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const [resultado] = await db.query(
      'INSERT INTO Usuarios (nome, email, senha, perfil) VALUES (?, ?, ?, ?)',
      [nome, email, senhaCriptografada, perfil.toLowerCase()]
    );

    return res.status(201).json({
      mensagem: 'Usuário registrado com sucesso!',
      usuarioId: resultado.insertId,
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    return res.status(500).json({
      mensagem: 'Erro interno do servidor.',
    });
  }
};

export const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      mensagem: 'Email e senha são obrigatórios.',
    });
  }

  try {
    const [usuarios] = await db.query(
      'SELECT * FROM Usuarios WHERE email = ?',
      [email]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({
        mensagem: 'Credenciais inválidas.',
      });
    }

    const usuario = usuarios[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({
        mensagem: 'Credenciais inválidas.',
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id_usuario,
        perfil: usuario.perfil,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );

    return res.json({
      mensagem: 'Login realizado com sucesso!',
      token,
      usuario: {
        id: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
      },
    });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({
      mensagem: 'Erro interno do servidor.',
    });
  }
};