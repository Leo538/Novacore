import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { TeamMember } from '../../shared/models/team-member.model';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule, CardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.scss'
})
export class NosotrosComponent implements OnInit {
  teamMembers: TeamMember[] = [
    {
      name: 'Johan',
      imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800',
      imageAlt: 'Johan',
      description: 'Ingeniero de Software especializado en Front-End y arquitectura de soluciones digitales robustas.',
      profileLink: 'perfil-johan.html'
    },
    {
      name: 'Christian',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      imageAlt: 'Christian',
      description: 'Especialista en Unity, Clean Architecture y desarrollo de sistemas interactivos a medida.',
      profileLink: 'perfil-christian.html'
    },
    {
      name: 'Ariel Paredes Lozada',
      imageUrl: 'assets/images/APL.jpg',
      imageAlt: 'Mateo',
      description: 'Experto en backend con Node y Typescript. Arquitecto de bases de datos',
      profileLink: 'https://arielparedeslozada.github.io/'
    },
    {
      name: 'Andrés',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800',
      imageAlt: 'Andrés',
      description: 'Desarrollador Full Stack con enfoque en bases de datos relacionales e integración de servicios.',
      profileLink: 'perfil-andres.html'
    },
    {
      name: 'Santi',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800',
      imageAlt: 'Santi',
      description: 'Ingeniero DevOps enfocado en la automatización de procesos y optimización de flujos de trabajo.',
      profileLink: 'perfil-santi.html'
    },
    {
      name: 'Luis',
      imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800',
      imageAlt: 'Luis',
      description: 'Especialista en UI/UX Design y personalización avanzada de interfaces de usuario.',
      profileLink: 'perfil-luis.html'
    }
  ];

  ngOnInit(): void {
    this.initTeamSwiper();
  }

  private initTeamSwiper(): void {
    if (typeof window !== 'undefined') {
      // Esperar a que Swiper esté disponible desde el CDN
      const checkSwiper = () => {
        if ((window as any).Swiper) {
          new (window as any).Swiper('.teamSwiper', {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 30,
          loop: true,
          grabCursor: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.team-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.team-next',
            prevEl: '.team-prev'
          },
          breakpoints: {
            320: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 30
            }
          }
          });
        } else {
          setTimeout(checkSwiper, 100);
        }
      };
      setTimeout(checkSwiper, 100);
    }
  }
}

