import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './features/header/header.component';
import { WhatsAppButtonComponent } from './components/whatsapp-button/whatsapp-button.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, WhatsAppButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
