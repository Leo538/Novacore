import { pool } from '../config/database.js';

const COLS = 'id, titulo, descripcion, fecha, enlaces, imagenes, autores, created_at, updated_at';

function rowToPost(row) {
  return {
    id: row.id,
    titulo: row.titulo,
    descripcion: row.descripcion,
    fecha: row.fecha,
    enlaces: row.enlaces ?? [],
    imagenes: row.imagenes ?? [],
    autores: row.autores ?? [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function findAll() {
  const { rows } = await pool.query(
    `SELECT ${COLS} FROM blog_posts ORDER BY fecha DESC`
  );
  return rows.map(rowToPost);
}

export async function findById(id) {
  const { rows } = await pool.query(
    `SELECT ${COLS} FROM blog_posts WHERE id = $1`,
    [id]
  );
  return rows[0] ? rowToPost(rows[0]) : null;
}

export async function create(data) {
  const { titulo, descripcion, fecha, enlaces, imagenes, autores } = data;
  const enlacesVal = Array.isArray(enlaces) ? enlaces : [];
  const imagenesVal = Array.isArray(imagenes) ? imagenes : [];
  const autoresVal = Array.isArray(autores) ? autores : [];
  const fechaVal = fecha ? new Date(fecha) : new Date();
  const { rows } = await pool.query(
    `INSERT INTO blog_posts (titulo, descripcion, fecha, enlaces, imagenes, autores, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, NOW())
     RETURNING ${COLS}`,
    [titulo.trim(), descripcion, fechaVal, JSON.stringify(enlacesVal), JSON.stringify(imagenesVal), JSON.stringify(autoresVal)]
  );
  return rowToPost(rows[0]);
}

export async function update(id, data) {
  const { titulo, descripcion, fecha, enlaces, imagenes, autores } = data;
  const updates = [];
  const values = [];
  let i = 1;
  if (titulo !== undefined) {
    updates.push(`titulo = $${i++}`);
    values.push(titulo);
  }
  if (descripcion !== undefined) {
    updates.push(`descripcion = $${i++}`);
    values.push(descripcion);
  }
  if (fecha !== undefined) {
    updates.push(`fecha = $${i++}`);
    values.push(new Date(fecha));
  }
  if (enlaces !== undefined) {
    updates.push(`enlaces = $${i++}`);
    values.push(JSON.stringify(Array.isArray(enlaces) ? enlaces : []));
  }
  if (imagenes !== undefined) {
    updates.push(`imagenes = $${i++}`);
    values.push(JSON.stringify(Array.isArray(imagenes) ? imagenes : []));
  }
  if (autores !== undefined) {
    updates.push(`autores = $${i++}`);
    values.push(JSON.stringify(Array.isArray(autores) ? autores : []));
  }
  if (updates.length === 0) {
    return findById(id);
  }
  updates.push('updated_at = NOW()');
  values.push(id);
  const { rows } = await pool.query(
    `UPDATE blog_posts SET ${updates.join(', ')} WHERE id = $${i} RETURNING ${COLS}`,
    values
  );
  return rows[0] ? rowToPost(rows[0]) : null;
}

export async function remove(id) {
  const { rowCount } = await pool.query('DELETE FROM blog_posts WHERE id = $1', [id]);
  return rowCount > 0;
}
