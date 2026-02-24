import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { BlogComponent } from './features/blog/blog.component';
import { ProyectosPageComponent } from './features/proyectos/proyectos-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'proyectos',
    component: ProyectosPageComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
