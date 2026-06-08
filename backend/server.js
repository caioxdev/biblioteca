import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

try {
  await import('./src/config/db.js');
  console.log('DB inicializado');
} catch (error) {
  console.log('Falha no DB:', error.message);
}

import authRoutes from './src/routes/auth.js';
import livrosRoutes from './src/routes/livros.js';
import emprestimosRoutes from './src/routes/emprestimos.js';


app.use('/auth', authRoutes);
app.use('/livros', livrosRoutes);
app.use('/emprestimos', emprestimosRoutes);

try {
  const swaggerPath = path.join(__dirname, 'swagger.json');
  const swaggerSpec = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
} catch (error) {
  console.log('Swagger não carregou:', error.message);
}

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação Swagger: http://localhost:${PORT}/docs\n`);
});