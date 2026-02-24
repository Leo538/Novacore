/**
 * Producción (Vercel).
 * IMPORTANTE: Actualiza esta URL con la URL real de tu backend en Railway
 * antes de hacer deploy, o configura la variable de entorno en Vercel.
 * 
 * Para usar variables de entorno en Vercel:
 * 1. Ve a tu proyecto en Vercel > Settings > Environment Variables
 * 2. Agrega: API_URL = https://tu-backend-real.railway.app
 * 3. En angular.json, agrega fileReplacements para reemplazar este archivo
 */
export const environment = {
  production: true,
  apiUrl: 'https://tu-backend.railway.app' // ⚠️ ACTUALIZA ESTA URL
};
