import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Frontend - Proyecto Final Distribuidas',
    description:
      'Interfaz web principal del proyecto final de Aplicaciones Distribuidas. Construida en JavaScript/TypeScript, consume los microservicios a través del gateway y ofrece la experiencia para los usuarios finales.',
    role: 'Frontend',
    repoUrl: 'https://github.com/ArielParedesLozada/Proyecto-Final-Distribuidas/tree/main/frontend',
    stack: ['JavaScript', 'TypeScript', 'Vite', 'CSS']
  },
  {
    id: 2,
    name: 'Gateway - Proyecto Final Distribuidas',
    description:
      'Gateway que orquesta la comunicación entre el frontend y los microservicios. Centraliza rutas, manejo de peticiones y actúa como punto de entrada a la arquitectura distribuida.',
    role: 'Gateway / BFF',
    repoUrl: 'https://github.com/ArielParedesLozada/Proyecto-Final-Distribuidas/tree/main/gateway',
    stack: ['Node.js', 'Express', 'API Gateway']
  },
  {
    id: 3,
    name: 'AuthService - Microservicio de Autenticación',
    description:
      'Microservicio de autenticación y gestión de usuarios del proyecto. Expone endpoints para login, registro y validación de credenciales dentro de la arquitectura distribuida.',
    role: 'Backend · Microservicio',
    repoUrl:
      'https://github.com/ArielParedesLozada/Proyecto-Final-Distribuidas/tree/main/services/AuthService',
    stack: ['C#', '.NET', 'REST API']
  },
  {
    id: 4,
    name: 'ChoferService - Microservicio de Gestión de Choferes',
    description:
      'Microservicio encargado de la lógica de negocio relacionada con choferes: registro, consulta y administración dentro del ecosistema distribuido.',
    role: 'Backend · Microservicio',
    repoUrl:
      'https://github.com/ArielParedesLozada/Proyecto-Final-Distribuidas/tree/main/services/ChoferService',
    stack: ['C#', '.NET', 'REST API']
  },
  {
    id: 5,
    name: 'Monorepo completo - Proyecto Final Distribuidas',
    description:
      'Repositorio raíz que agrupa frontend, gateway y microservicios. Muestra cómo se organiza el código y cómo conviven las distintas piezas del sistema distribuido.',
    role: 'Arquitectura del proyecto',
    repoUrl: 'https://github.com/ArielParedesLozada/Proyecto-Final-Distribuidas',
    stack: ['Monorepo', 'GitHub', 'Distribuidas']
  },
  {
    id: 6,
    name: 'Documentación y README del proyecto',
    description:
      'Archivo README principal donde se explica cómo instalar dependencias, correr cada servicio y comprender el contexto general del proyecto final.',
    role: 'Documentación',
    repoUrl: 'https://github.com/ArielParedesLozada/Proyecto-Final-Distribuidas#readme',
    stack: ['Markdown', 'Guía de instalación']
  }
];


