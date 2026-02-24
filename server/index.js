import 'dotenv/config';
import { env } from './config/env.js';
import { initDb } from './config/database.js';
import app from './app.js';

initDb()
  .then(() => {
    console.log('Base de datos lista (Neon PostgreSQL)');
    app.listen(env.PORT, () => {
      console.log(`Servidor en http://localhost:${env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error con la base de datos:', err.message);
    process.exit(1);
  });
