import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  constructor(
    private navigationService: NavigationService,
    private router: Router
  ) {
    if (typeof window !== 'undefined') {
      // Re‑inicializar observadores cada vez que se completa una navegación
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          // Esperar un poco a que Angular pinte el DOM de la nueva vista
          setTimeout(() => {
            this.initRevealAnimations();
            this.initSectionObserver();
          }, 200);
        });
    }
  }

  private initRevealAnimations(): void {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      revealObserver.observe(el);
    });
  }

  private initSectionObserver(): void {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute('data-nav') as 'theme-light' | 'theme-dark';
            if (theme) {
              this.navigationService.setTheme(theme);
            }
          }
        });
      },
      { rootMargin: '-90px 0px -85% 0px' }
    );

    document.querySelectorAll('[data-nav]').forEach((section) => {
      navObserver.observe(section);
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

