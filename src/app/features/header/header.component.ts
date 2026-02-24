import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../shared/services/navigation.service';
import { ScrollService } from '../../shared/services/scroll.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isMenuOpen = signal(false);

  constructor(
    public navigationService: NavigationService,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    // El servicio ya maneja el scroll
  }

  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  scrollToSection(sectionId: string): void {
    this.scrollService.scrollToSection(sectionId);
    this.isMenuOpen.set(false);
  }
}

