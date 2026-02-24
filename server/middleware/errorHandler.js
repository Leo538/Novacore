/**
 * Middleware global de errores.
 * Captura errores pasados con next(err) y devuelve una respuesta JSON.
 */
export function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.statusCode ?? 500;
  const message = err.message ?? 'Error interno del servidor';
  res.status(status).json({ error: message });
}
