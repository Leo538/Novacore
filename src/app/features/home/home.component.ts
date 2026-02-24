import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { ServiciosComponent } from '../servicios/servicios.component';
import { ProyectosComponent } from '../proyectos/proyectos.component';
import { StackComponent } from '../stack/stack.component';
import { NosotrosComponent } from '../nosotros/nosotros.component';
import { FooterComponent } from '../footer/footer.component';
import { BlogCarouselComponent } from '../blog/blog-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    ServiciosComponent,
    ProyectosComponent,
    StackComponent,
    BlogCarouselComponent,
    NosotrosComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}


