import pg from 'pg';
import { env } from './env.js';

const { Pool } = pg;

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: env.DATABASE_URL.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
});

/**
 * Comprueba la conexión a la base de datos.
 * El esquema se gestiona con migraciones: ejecuta `npm run migrate:up` en server/.
 */
export async function initDb() {
  const client = await pool.connect();
  try {
    await client.query('SELECT 1');
  } finally {
    client.release();
  }
}

export { pool };
