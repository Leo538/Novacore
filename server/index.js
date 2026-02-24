import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initDb } from './db.js';
import blogRoutes from './routes/blog.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/blog', blogRoutes);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'API Novacore Blog' });
});

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('Falta DATABASE_URL en .env');
  process.exit(1);
}

initDb()
  .then(() => {
    console.log('Base de datos lista (Neon PostgreSQL)');
    app.listen(PORT, () => {
      console.log(`Servidor en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error con la base de datos:', err.message);
    process.exit(1);
  });
