import * as blogService from '../services/blog.service.js';

export async function list(req, res, next) {
  try {
    const posts = await blogService.findAll();
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const post = await blogService.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const { titulo, descripcion, fecha, enlaces, imagenes, autores } = req.body;
    if (!titulo || !descripcion) {
      return res.status(400).json({ error: 'titulo y descripcion son obligatorios' });
    }
    const post = await blogService.create({ titulo, descripcion, fecha, enlaces, imagenes, autores });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const { titulo, descripcion, fecha, enlaces, imagenes, autores } = req.body;
    const post = await blogService.update(req.params.id, {
      titulo,
      descripcion,
      fecha,
      enlaces,
      imagenes,
      autores,
    });
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const deleted = await blogService.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
