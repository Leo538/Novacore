export interface BlogPostLink {
  texto: string;
  url: string;
}

/** Modelo usado en el front (mapeado desde la API del backend). */
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
  publishedAt: string;
  readTimeMinutes: number;
  tags: string[];
  enlaces: BlogPostLink[];
}

/** Respuesta cruda del API (Neon/PostgreSQL). */
export interface BlogPostApi {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  enlaces: BlogPostLink[];
  createdAt: string;
  updatedAt: string;
}
