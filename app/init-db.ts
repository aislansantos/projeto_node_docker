import { pool } from './db';

async function init() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS produtos (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        preco NUMERIC(10, 2) NOT NULL
      );
    `);

    await pool.query(`
      INSERT INTO produtos (nome, preco)
      VALUES ('Produto A', 19.90), ('Produto B', 29.90)
      ON CONFLICT DO NOTHING;
    `);

    console.log('Banco de dados inicializado com sucesso.');
  } catch (err) {
    console.error('Erro ao inicializar o banco:', err);
  } finally {
    await pool.end();
  }
}

init();
