export const verificarPerfil = (perfilPermitido) => (req, res, next) => {
  if (req.usuario?.perfil !== perfilPermitido) {
    return res.status(403).json({
      mensagem: `Acesso negado. Rota exclusiva para: ${perfilPermitido}.`
    });
  }
  next();
};