import express from 'express';
import cors from 'cors';
import blogRoutes from './routes/blog.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'API Novacore Blog' });
});

app.use('/api/blog', blogRoutes);
app.use('/api/upload', uploadRoutes);

app.use(errorHandler);

export default app;
