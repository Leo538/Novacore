import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  currentTheme = signal<'theme-light' | 'theme-dark'>('theme-light');
  isScrolled = signal(false);

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 50);
      });
    }
  }

  setTheme(theme: 'theme-light' | 'theme-dark'): void {
    this.currentTheme.set(theme);
  }
}

