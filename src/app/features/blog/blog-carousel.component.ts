import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BlogPost } from '../../shared/models/blog-post.model';
import { BLOG_POSTS_MOCK } from '../../shared/data/blog-posts.data';

@Component({
  selector: 'app-blog-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-carousel.component.html',
  styleUrl: './blog-carousel.component.scss'
})
export class BlogCarouselComponent implements OnInit {
  posts: BlogPost[] = BLOG_POSTS_MOCK;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initSwiper();
  }

  private initSwiper(): void {
    if (typeof window !== 'undefined') {
      const checkSwiper = () => {
        if ((window as any).Swiper) {
          new (window as any).Swiper('.blogSwiper', {
            slidesPerView: 2,
            spaceBetween: 24,
            loop: true,
            grabCursor: true,
            autoplay: {
              delay: 4500,
              disableOnInteraction: false
            },
            pagination: {
              el: '.blog-swiper-pagination',
              clickable: true
            },
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
        } else {
          setTimeout(checkSwiper, 100);
        }
      };

      setTimeout(checkSwiper, 100);
    }
  }

  goToBlog(): void {
    this.router.navigate(['/blog']);
  }
}



