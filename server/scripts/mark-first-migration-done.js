/**
 * Marca la primera migración como ya aplicada.
 * Úsalo solo si blog_posts ya existía en la BD (p. ej. creada con initDb anterior).
 * Ejecutar: node -r dotenv/config scripts/mark-first-migration-done.js
 */
import pg from 'pg';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const envPath = join(__dirname, '..', '.env');
try {
  const env = readFileSync(envPath, 'utf8');
  env.split('\n').forEach((line) => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  });
} catch {
  console.error('No se encontró .env en server/');
  process.exit(1);
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('Falta DATABASE_URL en .env');
  process.exit(1);
}

const client = new pg.Client({
  connectionString,
  ssl: connectionString.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
});

async function main() {
  await client.connect();
  try {
    const name = '1730000000000_create-blog-posts';
    const { rows } = await client.query('SELECT 1 FROM pgmigrations WHERE name = $1', [name]);
    if (rows.length > 0) {
      console.log('La migración ya estaba marcada:', name);
      return;
    }
    await client.query(
      `INSERT INTO pgmigrations (name, run_on) VALUES ($1, NOW())`,
      [name]
    );
    console.log('Migración marcada como aplicada:', name);
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
