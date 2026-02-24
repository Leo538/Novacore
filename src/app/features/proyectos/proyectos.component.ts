import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { Project } from '../../shared/models/project.model';
import { PROJECTS } from '../../shared/data/projects.data';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss'
})
export class ProyectosComponent implements OnInit {
  projects: Project[] = PROJECTS;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initSwiper();
  }

  private initSwiper(): void {
    if (typeof window !== 'undefined') {
      const checkSwiper = () => {
        if ((window as any).Swiper) {
          const minSlidesForLoop = 4; // Mínimo de slides para loop con 3 visibles
          const canLoop = this.projects.length >= minSlidesForLoop;
          
          new (window as any).Swiper('.projectsSwiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: canLoop,
            grabCursor: true,
            autoplay: canLoop ? { delay: 4500, disableOnInteraction: false } : false,
            pagination: {
              el: '.projects-swiper-pagination',
              clickable: true
            },
            navigation: {
              nextEl: '.projects-swiper-button-next',
              prevEl: '.projects-swiper-button-prev'
            },
            breakpoints: {
              768: { slidesPerView: 2, spaceBetween: 24 },
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

  goToAllProjects(): void {
    this.router.navigate(['/proyectos']);
  }
}


