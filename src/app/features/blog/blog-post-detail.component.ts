import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlogPost } from '../../shared/models/blog-post.model';
import { BlogApiService } from './services/blog-api.service';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-blog-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent],
  templateUrl: './blog-post-detail.component.html',
  styleUrl: './blog-post-detail.component.scss'
})
export class BlogPostDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private blogApi = inject(BlogApiService);

  post: BlogPost | null = null;
  loading = true;
  error: string | null = null;
  defaultImage = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading = false;
      this.error = 'Entrada no encontrada';
      return;
    }
    const idNum = Number(id);
    if (Number.isNaN(idNum)) {
      this.loading = false;
      this.error = 'Entrada no encontrada';
      return;
    }
    this.blogApi.getById(idNum).subscribe({
      next: (p) => {
        this.post = p;
        this.loading = false;
        if (!p) this.error = 'Entrada no encontrada';
      },
      error: () => {
        this.loading = false;
        this.error = 'No se pudo cargar la entrada';
      }
    });
  }

  goToEdit(): void {
    if (this.post) {
      this.router.navigate(['/blog'], { queryParams: { edit: this.post.id } });
    }
  }

  deletePost(): void {
    if (!this.post || !confirm('¿Eliminar esta entrada?')) return;
    this.blogApi.delete(this.post.id).subscribe((ok) => {
      if (ok) this.router.navigate(['/blog']);
    });
  }
}
