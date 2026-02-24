import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { Service } from '../../shared/models/service.model';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, CardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.scss'
})
export class ServiciosComponent implements OnInit {
  services: Service[] = [
    {
      title: 'Desarrollo Web Custom',
      description: 'Aplicaciones web de alto rendimiento utilizando React, Angular o Vue.',
      imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600',
      imageAlt: 'Desarrollo Web Full Stack',
      price: 'SaaS & Portales'
    },
    {
      title: 'Mobile Apps',
      description: 'Experiencias nativas e híbridas para iOS y Android con Flutter y React Native.',
      imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600',
      imageAlt: 'Desarrollo de Apps Móviles',
      price: 'iOS & Android'
    },
    {
      title: 'Cloud & DevOps',
      description: 'Infraestructura escalable en AWS y Azure con despliegue continuo.',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=600',
      imageAlt: 'Arquitectura Cloud y DevOps',
      price: 'Escalabilidad'
    },
    {
      title: 'IA & Data Science',
      description: 'Implementación de modelos de lenguaje y análisis predictivo de datos.',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600',
      imageAlt: 'Inteligencia Artificial aplicada',
      price: 'Innovación'
    }
  ];

  ngOnInit(): void {
    this.initSwiper();
  }

  private initSwiper(): void {
    if (typeof window !== 'undefined') {
      // Esperar a que Swiper esté disponible desde el CDN
      const checkSwiper = () => {
        if ((window as any).Swiper) {
          new (window as any).Swiper('.mySwiper', {
          slidesPerView: 3,
          spaceBetween: 30,
          loop: true,
          grabCursor: true,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 }
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

