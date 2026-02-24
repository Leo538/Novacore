/**
 * Parsea y valida el parámetro :id como entero.
 * Si es válido, asigna req.params.id (número); si no, responde 400.
 */
export function validateId(req, res, next) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  req.params.id = id;
  next();
}
