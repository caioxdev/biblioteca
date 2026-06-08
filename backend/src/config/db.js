import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function testConnection() {
  try {
    const conn = await db.getConnection();
    console.log('Conexão com MySQL realizada com sucesso');
    conn.release();
  } catch (error) {
    console.log('Erro ao conectar ao MySQL:', error.message);
  }
}

testConnection();

export default db;