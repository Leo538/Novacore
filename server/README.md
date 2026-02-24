# Backend Novacore – Blog API

API REST para el blog de Novacore con MongoDB.

## Campos del blog

| Campo        | Tipo   | Descripción                    |
|-------------|--------|--------------------------------|
| `titulo`    | string | Título del post (obligatorio)  |
| `descripcion` | string | Descripción (obligatorio)   |
| `fecha`     | Date   | Fecha y hora (por defecto: ahora) |
| `enlaces`   | array  | Lista de enlaces `[{ texto, url }]` |

## Configuración

1. En la carpeta `server`, crea un archivo `.env` (puedes copiar `.env.example`).
2. Define `MONGODB_URI` con tu cadena de conexión de MongoDB Atlas.
3. Opcional: `PORT` (por defecto 3000).

Ejemplo `.env`:

```env
PORT=3000
MONGODB_URI=mongodb+srv://barros11:leonel20@cluster0.iclujgn.mongodb.net/novacore
```

**Importante:** No subas el archivo `.env` a Git (contiene credenciales).

## Instalación y ejecución

```bash
cd server
npm install
npm run dev
```

Producción: `npm start`.

La API quedará en `http://localhost:3000`.

## Endpoints

| Método | Ruta           | Descripción        |
|--------|----------------|--------------------|
| GET    | /api/blog      | Listar todos los posts |
| GET    | /api/blog/:id  | Obtener un post    |
| POST   | /api/blog      | Crear post         |
| PUT    | /api/blog/:id  | Actualizar post    |
| DELETE | /api/blog/:id  | Eliminar post      |

### Ejemplo crear post (POST /api/blog)

```json
{
  "titulo": "Mi primer post",
  "descripcion": "Contenido del artículo...",
  "fecha": "2025-02-23T14:30:00.000Z",
  "enlaces": [
    { "texto": "Ver más", "url": "https://ejemplo.com" }
  ]
}
```

`fecha` y `enlaces` son opcionales. Si no envías `fecha`, se usa la fecha actual.
