import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

dotenv.config();

import './src/config/db.js';
import authRoutes from './src/routes/auth.js';
import livrosRoutes from './src/routes/livros.js';
import emprestimosRoutes from './src/routes/emprestimos.js';

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerSpec = JSON.parse(fs.readFileSync('./swagger.json', 'utf8'));

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/livros', livrosRoutes);
app.use('/emprestimos', emprestimosRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação Swagger: http://localhost:${PORT}/docs\n`);
});