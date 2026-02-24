import express from 'express';
import BlogPost from '../models/BlogPost.js';

const router = express.Router();

// GET /api/blog - Listar todos los posts (más recientes primero)
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ fecha: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/blog/:id - Obtener un post por ID
router.get('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ error: 'ID inválido' });
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
    const post = new BlogPost({
      titulo,
      descripcion,
      fecha: fecha ? new Date(fecha) : new Date(),
      enlaces: Array.isArray(enlaces) ? enlaces : [],
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/blog/:id - Actualizar un post
router.put('/:id', async (req, res) => {
  try {
    const { titulo, descripcion, fecha, enlaces } = req.body;
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      {
        ...(titulo != null && { titulo }),
        ...(descripcion != null && { descripcion }),
        ...(fecha != null && { fecha: new Date(fecha) }),
        ...(enlaces != null && { enlaces: Array.isArray(enlaces) ? enlaces : [] }),
      },
      { new: true, runValidators: true }
    );
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ error: 'ID inválido' });
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/blog/:id - Eliminar un post
router.delete('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.status(204).send();
  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ error: 'ID inválido' });
    res.status(500).json({ error: err.message });
  }
});

export default router;
