/**
 * Configuración de node-pg-migrate.
 * Carga .env desde la carpeta server para tener DATABASE_URL al ejecutar migraciones.
 */
require('dotenv').config({ path: require('path').join(__dirname, '.env') });

module.exports = {
  databaseUrl: process.env.DATABASE_URL,
  dir: 'migrations',
  migrationsTable: 'pgmigrations',
};
