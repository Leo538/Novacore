import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogPost } from '../../shared/models/blog-post.model';
import { ButtonComponent } from '../../components/button/button.component';
import { BLOG_POSTS_MOCK } from '../../shared/data/blog-posts.data';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  posts: BlogPost[] = BLOG_POSTS_MOCK;

  selectedPost: BlogPost | null = null;

  // Placeholder para el modal de creación (se conectará a backend más adelante)
  isCreateModalOpen = false;
  draftPost: Partial<BlogPost> = {
    title: '',
    excerpt: '',
    content: '',
    slug: '',
    tags: []
  };

  openCreateModal(): void {
    this.isCreateModalOpen = true;
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
  }

  saveDraft(): void {
    // Por ahora solo dejamos preparado el flujo de creación.
    // Más adelante aquí se llamará al backend para guardar.
    console.log('Borrador de post creado (frontend solamente):', this.draftPost);
    this.closeCreateModal();
  }

  openPost(post: BlogPost): void {
    this.selectedPost = post;
  }

  closePost(): void {
    this.selectedPost = null;
  }
}


