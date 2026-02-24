# Configuración para Vercel

## Problema de CORS

El error de CORS ocurre porque el backend necesita permitir el origen de Vercel. 

### Solución en el Backend (Railway):

En tu backend, asegúrate de que la configuración de CORS permita el origen de Vercel:

```javascript
// Ejemplo para Express
const cors = require('cors');

app.use(cors({
  origin: [
    'https://novacore-ttfw.vercel.app',
    'https://railway.com', // Si lo necesitas
    'http://localhost:3000' // Para desarrollo local
  ],
  credentials: true
}));
```

O si usas un middleware personalizado:

```javascript
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://novacore-ttfw.vercel.app',
    'http://localhost:3000'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});
```

## Configuración de la URL del Backend

### Opción 1: Actualizar manualmente antes de deploy

1. Edita `src/environments/environment.ts`
2. Cambia `apiUrl: 'https://tu-backend.railway.app'` por tu URL real de Railway
3. Haz commit y push

### Opción 2: Usar variables de entorno en Vercel (Recomendado)

1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Selecciona tu proyecto `novacore-ttfw`
3. Ve a **Settings** > **Environment Variables**
4. Agrega:
   - **Name**: `API_URL`
   - **Value**: `https://tu-backend-real.railway.app` (tu URL real)
   - **Environment**: Production, Preview, Development

5. Luego, crea un script de build que use esta variable:

En `package.json`, agrega:
```json
{
  "scripts": {
    "build:vercel": "ng build --configuration production"
  }
}
```

Y crea un archivo `vercel-build.sh`:
```bash
#!/bin/bash
# Reemplazar la URL en environment.ts con la variable de entorno
sed -i "s|apiUrl: 'https://tu-backend.railway.app'|apiUrl: '${API_URL:-https://tu-backend.railway.app}'|g" src/environments/environment.ts
ng build --configuration production
```

6. En Vercel, configura el **Build Command** como: `bash vercel-build.sh`

### Opción 3: Usar fileReplacements en angular.json

1. Crea `src/environments/environment.production.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-backend-real.railway.app'
};
```

2. En `angular.json`, agrega en la configuración de producción:
```json
"fileReplacements": [
  {
    "replace": "src/environments/environment.ts",
    "with": "src/environments/environment.production.ts"
  }
]
```

## Variables de Entorno del Backend

Las variables que mencionaste son para el **backend**, no para el frontend:

- `PORT=3000`
- `DATABASE_URL=postgresql://...`
- `CLOUDINARY_CLOUD_NAME=...`
- `CLOUDINARY_API_KEY=...`
- `CLOUDINARY_API_SECRET=...`

Estas deben configurarse en **Railway** (donde está tu backend), no en Vercel.

## Resumen

1. **Backend (Railway)**: Configura CORS para permitir `https://novacore-ttfw.vercel.app`
2. **Frontend (Vercel)**: Actualiza la URL del backend en `environment.ts` o usa variables de entorno
3. **Variables de entorno del backend**: Configúralas en Railway, no en Vercel

