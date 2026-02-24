import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import type { BlogPost, BlogPostApi, BlogPostLink } from '../../../shared/models/blog-post.model';

function apiToPost(api: BlogPostApi): BlogPost {
  const desc = api.descripcion ?? '';
  const excerpt = desc.length > 160 ? desc.slice(0, 157) + '...' : desc;
  return {
    id: api.id,
    title: api.titulo ?? '',
    slug: `post-${api.id}`,
    excerpt,
    content: desc,
    imageUrl: '',
    imageAlt: '',
    publishedAt: api.fecha ?? new Date().toISOString(),
    readTimeMinutes: Math.max(1, Math.ceil(desc.length / 400)),
    tags: [],
    enlaces: Array.isArray(api.enlaces) ? api.enlaces : []
  };
}

function postToApiBody(post: Partial<BlogPost>): { titulo: string; descripcion: string; fecha?: string; enlaces: BlogPostLink[] } {
  const enlaces = (post.enlaces ?? []).filter(e => e?.url?.trim());
  return {
    titulo: post.title ?? '',
    descripcion: post.content ?? post.excerpt ?? '',
    fecha: post.publishedAt,
    enlaces
  };
}

@Injectable({ providedIn: 'root' })
export class BlogApiService {
  private readonly baseUrl = `${environment.apiUrl}/api/blog`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<BlogPost[]> {
    return this.http.get<BlogPostApi[]>(this.baseUrl).pipe(
      map(list => list.map(apiToPost)),
      catchError(err => {
        console.error('BlogApiService.getAll', err);
        return of([]);
      })
    );
  }

  getById(id: number): Observable<BlogPost | null> {
    return this.http.get<BlogPostApi>(`${this.baseUrl}/${id}`).pipe(
      map(apiToPost),
      catchError(() => of(null))
    );
  }

  create(post: Partial<BlogPost>): Observable<BlogPost | null> {
    const body = postToApiBody(post);
    return this.http.post<BlogPostApi>(this.baseUrl, body).pipe(
      map(apiToPost),
      catchError(err => {
        console.error('BlogApiService.create', err);
        return of(null);
      })
    );
  }

  update(id: number, post: Partial<BlogPost>): Observable<BlogPost | null> {
    const body = postToApiBody(post);
    return this.http.put<BlogPostApi>(`${this.baseUrl}/${id}`, body).pipe(
      map(apiToPost),
      catchError(err => {
        console.error('BlogApiService.update', err);
        return of(null);
      })
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`, { observe: 'response' }).pipe(
      map(res => res.status === 204),
      catchError(() => of(false))
    );
  }
}
