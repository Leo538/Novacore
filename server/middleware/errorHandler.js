/**
 * Middleware global de errores.
 * Captura errores pasados con next(err) y devuelve una respuesta JSON.
 */
export function errorHandler(err, req, res, next) {
  console.error(err);
  let status = err.statusCode ?? 500;
  let message = err.message ?? 'Error interno del servidor';
  if (err.code === 'LIMIT_FILE_SIZE') {
    status = 400;
    message = 'La imagen es demasiado grande (máx. 5 MB)';
  }
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    status = 400;
    message = 'Envía el archivo en el campo "image"';
  }
  res.status(status).json({ error: message });
}
