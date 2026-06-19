import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensagem: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ mensagem: 'Token inválido ou expirado.' });
  }
};