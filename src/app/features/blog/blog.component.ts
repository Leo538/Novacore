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

  draftPost: Partial<BlogPost> = {
    title: '',
    content: '',
    excerpt: '',
    publishedAt: new Date().toISOString().slice(0, 16),
    enlaces: []
  };

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
    this.draftPost = {
      title: '',
      content: '',
      excerpt: '',
      publishedAt: new Date().toISOString().slice(0, 16),
      enlaces: []
    };
    this.isCreateModalOpen = true;
    this.isEditModalOpen = false;
    this.editingPostId = null;
  }

  openEditModal(post: BlogPost): void {
    this.editingPostId = post.id;
    this.draftPost = {
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt?.slice(0, 16) ?? new Date().toISOString().slice(0, 16),
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
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editingPostId = null;
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

  saveCreate(): void {
    if (!this.draftPost.title?.trim() || !this.draftPost.content?.trim()) return;
    this.saving = true;
    const payload = {
      ...this.draftPost,
      excerpt: this.draftPost.excerpt ?? this.draftPost.content?.slice(0, 160) ?? ''
    };
    this.blogApi.create(payload).subscribe({
      next: (created) => {
        this.saving = false;
        if (created) {
          this.loadPosts();
          this.closeCreateModal();
        }
      },
      error: () => { this.saving = false; }
    });
  }

  saveEdit(): void {
    if (this.editingPostId == null || !this.draftPost.title?.trim() || !this.draftPost.content?.trim()) return;
    this.saving = true;
    const payload = {
      ...this.draftPost,
      excerpt: this.draftPost.excerpt ?? this.draftPost.content?.slice(0, 160) ?? ''
    };
    this.blogApi.update(this.editingPostId, payload).subscribe({
      next: (updated) => {
        this.saving = false;
        if (updated) {
          this.loadPosts();
          this.closeEditModal();
        }
      },
      error: () => { this.saving = false; }
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
