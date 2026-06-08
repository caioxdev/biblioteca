import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.getConnection()
  .then(connection => {
    console.log('Conexão com o MySQL realizada com sucesso');
    connection.release();
  })
  .catch(error => {
    console.log('Erro ao conectar ao MySQL:', error.message);
  });

export default db;