import { BlogPost } from '../models/blog-post.model';

export const BLOG_POSTS_MOCK: BlogPost[] = [
  {
    id: 1,
    title: 'Diseñando arquitecturas escalables para SaaS',
    slug: 'arquitecturas-escalables-saas',
    excerpt:
      'Aprende cómo diseñamos arquitecturas modulares y escalables para productos SaaS que necesitan crecer rápido sin perder estabilidad.',
    content:
      'En este artículo profundizamos en cómo descomponer tu aplicación en servicios, definir límites claros entre dominios y elegir patrones como CQRS, colas de mensajes y autoscaling en la nube. Además, mostramos ejemplos reales de decisiones de arquitectura que hemos tomado en proyectos SaaS para evitar cuellos de botella y optimizar costos.',
    imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=900',
    imageAlt: 'Arquitectura de software en pizarras',
    publishedAt: '2026-02-20',
    readTimeMinutes: 8,
    tags: ['Arquitectura', 'SaaS', 'Backend'],
    enlaces: []
  },
  {
    id: 2,
    title: 'Checklist de calidad para lanzar a producción',
    slug: 'checklist-calidad-produccion',
    excerpt:
      'Nuestro checklist interno para asegurar que cada despliegue a producción se haga con confianza y sin sorpresas.',
    content:
      'Compartimos nuestro checklist de pre-release: pruebas automatizadas, revisión de métricas, backups, migraciones de base de datos y comunicación con stakeholders. Esta guía la usamos en todos los proyectos antes de tocar el botón de “deploy”.',
    imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900',
    imageAlt: 'Laptop con código y checklist',
    publishedAt: '2026-02-10',
    readTimeMinutes: 6,
    tags: ['DevOps', 'Calidad', 'Buenas prácticas'],
    enlaces: []
  },
  {
    id: 3,
    title: 'Cómo organizamos tareas técnicas en Novacore',
    slug: 'organizamos-tareas-tecnicas',
    excerpt:
      'Un vistazo a cómo convertimos tareas técnicas en historias de valor y las visualizamos dentro de nuestro tablero de trabajo.',
    content:
      'Te mostramos cómo partimos tareas grandes en subtareas accionables, cómo priorizamos por impacto y esfuerzo y cómo mantenemos visibilidad del trabajo en curso usando tableros Kanban y herramientas de tracking.',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900',
    imageAlt: 'Equipo de desarrollo colaborando',
    publishedAt: '2026-01-28',
    readTimeMinutes: 5,
    tags: ['Gestión', 'Productividad', 'Equipo'],
    enlaces: []
  }
];


