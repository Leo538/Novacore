import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './features/header/header.component';
import { HeroComponent } from './features/hero/hero.component';
import { ServiciosComponent } from './features/servicios/servicios.component';
import { ProyectosComponent } from './features/proyectos/proyectos.component';
import { StackComponent } from './features/stack/stack.component';
import { NosotrosComponent } from './features/nosotros/nosotros.component';
import { FooterComponent } from './features/footer/footer.component';
import { WhatsAppButtonComponent } from './components/whatsapp-button/whatsapp-button.component';
import { ScrollService } from './shared/services/scroll.service';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    HeroComponent,
    ServiciosComponent,
    ProyectosComponent,
    StackComponent,
    NosotrosComponent,
    FooterComponent,
    WhatsAppButtonComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    // El servicio se inicializa automáticamente
  }
}
