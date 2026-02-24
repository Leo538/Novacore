import express from 'express';
import cors from 'cors';
import blogRoutes from './routes/blog.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Límite alto para imágenes en base64 (20 MB)
const JSON_LIMIT = 20 * 1024 * 1024;

app.use(cors());
app.use(express.json({ limit: JSON_LIMIT }));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'API Novacore Blog' });
});

app.use('/api/blog', blogRoutes);
app.use('/api/upload', uploadRoutes);

app.use(errorHandler);

export default app;
