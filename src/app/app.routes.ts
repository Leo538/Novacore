import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { BlogComponent } from './features/blog/blog.component';
import { ProyectosPageComponent } from './features/proyectos/proyectos-page.component';
import { BlogPostDetailComponent } from './features/blog/blog-post-detail.component';

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
    path: 'blog/post/:id',
    component: BlogPostDetailComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
