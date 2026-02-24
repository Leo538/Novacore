/**
 * Variables de entorno validadas.
 * El servidor no arranca si falta DATABASE_URL.
 */
function loadEnv() {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL || DATABASE_URL.trim() === '') {
    console.error('Falta DATABASE_URL en .env');
    process.exit(1);
  }
  return {
    PORT: Number(process.env.PORT) || 3000,
    DATABASE_URL,
  };
}

export const env = loadEnv();
