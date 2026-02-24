import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogPost, BlogPostLink } from '../../shared/models/blog-post.model';
import { ButtonComponent } from '../../components/button/button.component';
import { BlogApiService } from './services/blog-api.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  private blogApi = inject(BlogApiService);

  posts: BlogPost[] = [];
  loading = true;
  error: string | null = null;

  selectedPost: BlogPost | null = null;
  isCreateModalOpen = false;
  isEditModalOpen = false;
  saving = false;
  editingPostId: number | null = null;
  /** Mensaje de error al guardar (ej. servidor no disponible). */
  modalError: string | null = null;

  draftPost: Partial<BlogPost> = {
    title: '',
    content: '',
    excerpt: '',
    publishedAt: this.getTodayDateString(),
    imageUrl: '',
    imageAlt: '',
    authors: [],
    enlaces: []
  };

  private readonly maxAuthors = 6;

  getTodayDateString(): string {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  /** Fecha formateada para mostrar en el campo bloqueado (Nueva entrada). */
  get displayDateCreate(): string {
    const raw = this.draftPost.publishedAt ?? this.getTodayDateString();
    const [y, m, d] = raw.slice(0, 10).split('-');
    return `${d}/${m}/${y}`;
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.error = null;
    this.blogApi.getAll().subscribe({
      next: (list) => {
        this.posts = list;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar las entradas. Comprueba que el backend esté en marcha.';
        this.loading = false;
      }
    });
  }

  openCreateModal(): void {
    this.modalError = null;
    this.draftPost = {
      title: '',
      content: '',
      excerpt: '',
      publishedAt: this.getTodayDateString(),
      imageUrl: '',
      imageAlt: '',
      authors: [''],
      enlaces: []
    };
    this.isCreateModalOpen = true;
    this.isEditModalOpen = false;
    this.editingPostId = null;
  }

  openEditModal(post: BlogPost): void {
    this.modalError = null;
    this.editingPostId = post.id;
    const authors = (post.authors ?? []).slice(0, this.maxAuthors);
    this.draftPost = {
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt?.slice(0, 10) ?? this.getTodayDateString(),
      imageUrl: post.imageUrl ?? '',
      imageAlt: post.imageAlt ?? '',
      authors: authors.length > 0 ? authors : [''],
      enlaces: post.enlaces?.length ? [...post.enlaces] : []
    };
    this.isEditModalOpen = true;
    this.isCreateModalOpen = false;
    this.selectedPost = null;
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    this.isEditModalOpen = false;
    this.editingPostId = null;
    this.modalError = null;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editingPostId = null;
    this.modalError = null;
  }

  /** True si título, descripción y al menos un autor están rellenados. */
  get isFormValid(): boolean {
    const titleOk = !!this.draftPost.title?.trim();
    const contentOk = !!this.draftPost.content?.trim();
    const authors = (this.draftPost.authors ?? []).map(a => a?.trim()).filter(Boolean);
    return titleOk && contentOk && authors.length >= 1;
  }

  addEnlace(): void {
    const enlaces = this.draftPost.enlaces ?? [];
    this.draftPost = { ...this.draftPost, enlaces: [...enlaces, { texto: '', url: '' }] };
  }

  removeEnlace(index: number): void {
    const enlaces = [...(this.draftPost.enlaces ?? [])];
    enlaces.splice(index, 1);
    this.draftPost = { ...this.draftPost, enlaces };
  }

  addAuthor(): void {
    const authors = this.draftPost.authors ?? [];
    if (authors.length >= this.maxAuthors) return;
    this.draftPost = { ...this.draftPost, authors: [...authors, ''] };
  }

  removeAuthor(index: number): void {
    const authors = [...(this.draftPost.authors ?? [])];
    if (authors.length <= 1) return;
    authors.splice(index, 1);
    this.draftPost = { ...this.draftPost, authors };
  }

  onImageFileSelected(event: Event, input: HTMLInputElement): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.draftPost = {
        ...this.draftPost,
        imageUrl: reader.result as string,
        imageAlt: this.draftPost.imageAlt || file.name
      };
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  clearImage(): void {
    this.draftPost = { ...this.draftPost, imageUrl: '', imageAlt: '' };
  }

  /** Devuelve la lista de autores con al menos uno rellenado; si no, null. */
  private getValidAuthors(): string[] | null {
    const list = (this.draftPost.authors ?? []).map(a => a?.trim()).filter(Boolean);
    return list.length >= 1 ? list : null;
  }

  saveCreate(): void {
    const authors = this.getValidAuthors();
    if (!this.draftPost.title?.trim() || !this.draftPost.content?.trim() || !authors) return;
    this.modalError = null;
    this.saving = true;
    const payload = {
      ...this.draftPost,
      publishedAt: this.getTodayDateString(),
      excerpt: this.draftPost.excerpt ?? this.draftPost.content?.slice(0, 160) ?? '',
      authors
    };
    this.blogApi.create(payload).subscribe({
      next: (created) => {
        this.saving = false;
        this.modalError = null;
        if (created) {
          this.loadPosts();
          this.closeCreateModal();
        }
      },
      error: () => {
        this.saving = false;
        this.modalError = 'No se pudo guardar. Comprueba que el servidor esté en marcha (puerto 3000).';
      }
    });
  }

  saveEdit(): void {
    const authors = this.getValidAuthors();
    if (this.editingPostId == null || !this.draftPost.title?.trim() || !this.draftPost.content?.trim() || !authors) return;
    this.modalError = null;
    this.saving = true;
    const payload = {
      ...this.draftPost,
      excerpt: this.draftPost.excerpt ?? this.draftPost.content?.slice(0, 160) ?? '',
      authors
    };
    this.blogApi.update(this.editingPostId, payload).subscribe({
      next: (updated) => {
        this.saving = false;
        this.modalError = null;
        if (updated) {
          this.loadPosts();
          this.closeEditModal();
        }
      },
      error: () => {
        this.saving = false;
        this.modalError = 'No se pudo guardar. Comprueba que el servidor esté en marcha (puerto 3000).';
      }
    });
  }

  deletePost(post: BlogPost): void {
    if (!confirm('¿Eliminar esta entrada?')) return;
    this.blogApi.delete(post.id).subscribe(ok => {
      if (ok) {
        this.loadPosts();
        this.closePost();
      }
    });
  }

  openPost(post: BlogPost): void {
    this.selectedPost = post;
  }

  closePost(): void {
    this.selectedPost = null;
  }

  trackByIndex(i: number): number {
    return i;
  }
}
