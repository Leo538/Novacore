import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { Project } from '../../shared/models/project.model';
import { PROJECTS } from '../../shared/data/projects.data';

@Component({
  selector: 'app-proyectos-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './proyectos-page.component.html',
  styleUrl: './proyectos-page.component.scss'
})
export class ProyectosPageComponent {
  projects: Project[] = PROJECTS;
}


