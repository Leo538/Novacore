import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BlogPost } from '../../shared/models/blog-post.model';
import { BlogApiService } from './services/blog-api.service';

@Component({
  selector: 'app-blog-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-carousel.component.html',
  styleUrl: './blog-carousel.component.scss'
})
export class BlogCarouselComponent implements OnInit {
  private router = inject(Router);
  private blogApi = inject(BlogApiService);

  posts: BlogPost[] = [];

  ngOnInit(): void {
    this.blogApi.getAll().subscribe((list) => {
      this.posts = list;
      if (this.posts.length > 0 && typeof window !== 'undefined') {
        setTimeout(() => this.initSwiper(), 150);
      }
    });
  }

  private initSwiper(): void {
    if ((window as any).Swiper) {
      new (window as any).Swiper('.blogSwiper', {
        slidesPerView: 2,
        spaceBetween: 24,
        loop: this.posts.length > 1,
        grabCursor: true,
        autoplay: this.posts.length > 1 ? { delay: 4500, disableOnInteraction: false } : false,
        pagination: { el: '.blog-swiper-pagination', clickable: true },
        navigation: {
          nextEl: '.blog-swiper-button-next',
          prevEl: '.blog-swiper-button-prev'
        },
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 12 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1200: { slidesPerView: 3, spaceBetween: 28 }
        }
      });
    }
  }

  goToBlog(): void {
    this.router.navigate(['/blog']);
  }
}
