# Backend Novacore – Blog API

API REST para el blog de Novacore con **Neon (PostgreSQL)**.

## Campos del blog

| Campo        | Tipo   | Descripción                    |
|-------------|--------|--------------------------------|
| `titulo`    | string | Título del post (obligatorio)  |
| `descripcion` | string | Descripción (obligatorio)   |
| `fecha`     | Date   | Fecha y hora (por defecto: ahora) |
| `enlaces`   | array  | Lista de enlaces `[{ texto, url }]` |
| `imagenes`  | array  | URLs de imágenes `[{ url, alt? }]` — ver [Imágenes](#imágenes-no-guardar-en-neon) |
| `autores`   | array  | Nombres de autor(es) `["Nombre 1", "Nombre 2"]` |

## Configuración

1. En la carpeta `server`, crea un archivo `.env` (puedes copiar `.env.example`).
2. Define `DATABASE_URL` con tu cadena de conexión de Neon (PostgreSQL).
3. Opcional: `PORT` (por defecto 3000).

Ejemplo `.env`:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

**Importante:** No subas el archivo `.env` a Git (contiene credenciales).

## Instalación y ejecución

```bash
cd server
npm install
npm run migrate:up   # aplicar migraciones (crear/actualizar tablas en Neon)
npm run dev
```

Producción: `npm start`.

## Migraciones (esquema de la base de datos)

El esquema se gestiona con **node-pg-migrate**. Al cambiar tablas o campos, se aplican con migraciones y así Neon se mantiene al día.

| Comando | Descripción |
|--------|-------------|
| `npm run migrate:up` | Aplica todas las migraciones pendientes |
| `npm run migrate:down` | Revierte la última migración |
| `npm run migrate` | Estado de migraciones |
| `npm run migrate:create nombre-de-cambio` | Crea una nueva migración en `server/migrations/` |

**Ejemplo:** añadir una columna `vistas` a `blog_posts`:

1. `npm run migrate:create add-vistas-to-blog-posts`
2. Editar el archivo nuevo en `migrations/` y usar `pgm.addColumns('blog_posts', { vistas: { type: 'integer', notNull: true, default: 0 } });` en `up`, y `pgm.dropColumns('blog_posts', ['vistas'])` en `down`.
3. `npm run migrate:up`

La configuración está en `migrate.config.cjs` y usa `DATABASE_URL` de tu `.env`.

La API quedará en `http://localhost:3000`.

## Imágenes: no guardar en Neon

**En Neon solo se guardan las URLs de las imágenes**, no los archivos (binarios). Así no consumes espacio de almacenamiento de la base de datos y el plan gratuito sigue siendo suficiente.

**Flujo recomendado:**

1. Subir la imagen a un servicio de alojamiento gratuito.
2. Obtener la URL pública de la imagen.
3. Guardar en el post el array `imagenes` con esa URL (y opcionalmente `alt`).

**Servicios gratuitos para alojar imágenes (fuera de Neon):**

| Servicio | Notas |
|----------|--------|
| [Cloudinary](https://cloudinary.com) | Plan free: espacio y ancho de banda generoso, API sencilla. |
| [Imgbb](https://imgbb.com) | Gratis, sin cuenta obligatoria para subir; devuelve URL. |
| [Supabase Storage](https://supabase.com/storage) | 1 GB gratis; útil si ya usas Supabase. |
| [Imgur](https://imgur.com) | API gratuita con límites; buena para pruebas. |
| [Uploadthing](https://uploadthing.com) | Plan free para proyectos pequeños. |

Elige uno, sube la imagen allí y guarda en tu post algo como:  
`"imagenes": [{ "url": "https://tu-servicio.com/imagen.jpg", "alt": "Descripción" }]`.

### Subir foto desde el dispositivo (recomendado)

Si configuras **Cloudinary** en tu `.env`, el backend puede recibir la imagen que el usuario elige en su dispositivo, subirla a Cloudinary y devolver la URL. Así en tu front solo haces:

1. **Subir la imagen** → `POST /api/upload` con el archivo en el campo `image` (multipart/form-data).
2. **Usar la URL en el post** → La respuesta trae `url`; la guardas en `imagenes` al crear o editar el post.

**Endpoint:** `POST /api/upload`

- **Content-Type:** `multipart/form-data`
- **Campo:** `image` (archivo; formatos: JPEG, PNG, GIF, WebP; máx. 5 MB)
- **Respuesta 201:** `{ "url": "https://res.cloudinary.com/...", "publicId": "...", "width": 800, "height": 600 }`

**Ejemplo desde el frontend (HTML + JS):**

```html
<input type="file" id="foto" accept="image/*" />
<button onclick="subirYGuardarUrl()">Subir</button>
<script>
  async function subirYGuardarUrl() {
    const input = document.getElementById('foto');
    if (!input.files?.length) return;
    const form = new FormData();
    form.append('image', input.files[0]);
    const res = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    if (res.ok) {
      console.log('URL para guardar en el post:', data.url);
      // Añadir data.url al array imagenes del post (crear o actualizar con POST/PUT /api/blog)
    }
  }
</script>
```

Configuración: en `.env` añade `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` y `CLOUDINARY_API_SECRET` (cuenta gratis en [cloudinary.com](https://cloudinary.com)). Sin ellas, `POST /api/upload` responde 503.

## Endpoints

| Método | Ruta           | Descripción        |
|--------|----------------|--------------------|
| GET    | /api/blog      | Listar todos los posts |
| GET    | /api/blog/:id  | Obtener un post    |
| POST   | /api/blog      | Crear post         |
| PUT    | /api/blog/:id  | Actualizar post    |
| DELETE | /api/blog/:id  | Eliminar post      |
| POST   | /api/upload    | Subir imagen desde el dispositivo → devuelve URL para guardar en el post |

### Ejemplo crear post (POST /api/blog)

```json
{
  "titulo": "Mi primer post",
  "descripcion": "Contenido del artículo...",
  "fecha": "2025-02-23T14:30:00.000Z",
  "enlaces": [
    { "texto": "Ver más", "url": "https://ejemplo.com" }
  ],
  "imagenes": [
    { "url": "https://tu-cdn.com/foto.jpg", "alt": "Foto del artículo" }
  ],
  "autores": ["María García", "Juan Pérez"]
}
```

`fecha`, `enlaces`, `imagenes` y `autores` son opcionales. Si no envías `fecha`, se usa la fecha actual. Para imágenes, usa solo URLs (ver [Imágenes](#imágenes-no-guardar-en-neon)).

Los IDs de los posts son numéricos (por ejemplo `1`, `2`).

## Estructura del proyecto

```
server/
├── index.js              # Entrada: carga env, init DB, arranca app
├── app.js                # Express: middleware, rutas, manejador de errores
├── config/
│   ├── env.js            # Validación de variables de entorno
│   ├── database.js       # Pool PostgreSQL e initDb
│   └── cloudinary.js     # Configuración Cloudinary (subida de imágenes)
├── migrations/           # Migraciones (node-pg-migrate); aplicar con npm run migrate:up
│   └── ..._create-blog-posts.js
├── migrate.config.cjs    # Configuración de node-pg-migrate (DATABASE_URL, carpeta)
├── controllers/
│   ├── blog.controller.js   # Lógica de petición/respuesta del blog
│   └── upload.controller.js # Subida de imagen a Cloudinary, devuelve URL
├── services/
│   └── blog.service.js   # Lógica de negocio y acceso a BD
├── routes/
│   ├── blog.routes.js    # Definición de rutas /api/blog
│   └── upload.routes.js  # POST /api/upload (imagen → Cloudinary → URL)
└── middleware/
    ├── validateId.js     # Valida :id como entero
    ├── upload.js         # Multer: acepta imagen en campo "image", máx. 5 MB
    └── errorHandler.js   # Respuesta centralizada de errores
```
