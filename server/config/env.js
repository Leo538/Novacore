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
    // Cloudinary (opcional): para subir imágenes desde el sistema y guardar URL en la BD
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
  };
}

export const env = loadEnv();
