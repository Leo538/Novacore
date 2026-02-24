import streamifier from 'streamifier';
import { cloudinary, cloudinaryConfigured } from '../config/cloudinary.js';

export async function uploadImage(req, res, next) {
  try {
    if (!cloudinaryConfigured) {
      return res.status(503).json({
        error: 'Subida de imágenes no configurada',
        message: 'Añade CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET en .env',
      });
    }

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        error: 'Falta la imagen',
        message: 'Envía un campo "image" con el archivo (multipart/form-data)',
      });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'novacore-blog' },
        (err, data) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    res.status(201).json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (err) {
    next(err);
  }
}
