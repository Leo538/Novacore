import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

const rowToPost = (row) => ({
  id: row.id,
  titulo: row.titulo,
  descripcion: row.descripcion,
  fecha: row.fecha,
  enlaces: row.enlaces || [],
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

// GET /api/blog - Listar todos los posts (más recientes primero)
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, titulo, descripcion, fecha, enlaces, created_at, updated_at FROM blog_posts ORDER BY fecha DESC'
    );
    res.json(rows.map(rowToPost));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/blog/:id - Obtener un post por ID
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
    const { rows } = await pool.query(
      'SELECT id, titulo, descripcion, fecha, enlaces, created_at, updated_at FROM blog_posts WHERE id = $1',
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(rowToPost(rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/blog - Crear un nuevo post
router.post('/', async (req, res) => {
  try {
    const { titulo, descripcion, fecha, enlaces } = req.body;
    if (!titulo || !descripcion) {
      return res.status(400).json({ error: 'titulo y descripcion son obligatorios' });
    }
    const enlacesVal = Array.isArray(enlaces) ? enlaces : [];
    const fechaVal = fecha ? new Date(fecha) : new Date();
    const { rows } = await pool.query(
      `INSERT INTO blog_posts (titulo, descripcion, fecha, enlaces, updated_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING id, titulo, descripcion, fecha, enlaces, created_at, updated_at`,
      [titulo.trim(), descripcion, fechaVal, JSON.stringify(enlacesVal)]
    );
    res.status(201).json(rowToPost(rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/blog/:id - Actualizar un post
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
    const { titulo, descripcion, fecha, enlaces } = req.body;

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
    if (updates.length === 0) {
      const { rows } = await pool.query(
        'SELECT id, titulo, descripcion, fecha, enlaces, created_at, updated_at FROM blog_posts WHERE id = $1',
        [id]
      );
      if (rows.length === 0) return res.status(404).json({ error: 'Post no encontrado' });
      return res.json(rowToPost(rows[0]));
    }
    updates.push(`updated_at = NOW()`);
    values.push(id);
    const { rows } = await pool.query(
      `UPDATE blog_posts SET ${updates.join(', ')} WHERE id = $${i} RETURNING id, titulo, descripcion, fecha, enlaces, created_at, updated_at`,
      values
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(rowToPost(rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/blog/:id - Eliminar un post
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
    const { rowCount } = await pool.query('DELETE FROM blog_posts WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Post no encontrado' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
