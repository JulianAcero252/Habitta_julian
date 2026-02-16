# Habitta

**Habitta** es una plataforma web moderna para la gestión y publicación de propiedades inmobiliarias. Permite a los usuarios explorar propiedades disponibles, registrar nuevas publicaciones con planes de promoción personalizados, y gestionar favoritos de manera intuitiva. Construida con tecnologías de vanguardia para ofrecer una experiencia fluida y profesional.

---

## Tecnologías Utilizadas

Este proyecto está construido utilizando las siguientes tecnologías y herramientas:

### **Frontend**

- **[React 19.2.0](https://react.dev/)** - Biblioteca para construir interfaces de usuario interactivas
- **[TypeScript 5.9.3](https://www.typescriptlang.org/)** - Superset de JavaScript con tipado estático
- **[React Router DOM 7.10.1](https://reactrouter.com/)** - Sistema de navegación y enrutamiento para aplicaciones React

### **Estilos**

- **CSS3 Puro** - Estilos personalizados con CSS moderno, diseño responsive y animaciones nativas

### **Herramientas de Desarrollo**

- **[Vite](https://vite.dev/)** (Rolldown Vite 7.2.5) - Build tool ultrarrápido con HMR (Hot Module Replacement)
- **[ESLint 9.39.1](https://eslint.org/)** - Linter para mantener código consistente y libre de errores
- **[@vitejs/plugin-react 5.1.1](https://github.com/vitejs/vite-plugin-react)** - Plugin oficial de React para Vite

### **Backend y Servicios**

- **[Supabase 2.95.3](https://supabase.com/)** - Backend-as-a-Service para autenticación, base de datos PostgreSQL y almacenamiento

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu entorno de desarrollo:

- **[Node.js](https://nodejs.org/)** - Versión 18.x o superior
- **[npm](https://www.npmjs.com/)** - Versión 9.x o superior (incluido con Node.js)
- **[Git](https://git-scm.com/)** - Para clonar el repositorio

### Verificación de Versiones

Puedes verificar las versiones instaladas ejecutando:

```bash
node --version
npm --version
git --version
```

---

## Instalación y Configuración

Sigue estos pasos para instalar y configurar el proyecto en tu máquina local:

### 1. Clonar el Repositorio

```bash
git clone https://github.com/MRstiven232004/Habitta.git
cd Habitta
```

### 2. Instalar Dependencias

```bash
npm install
```

Este comando instalará todas las dependencias necesarias listadas en `package.json`.

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias para Supabase:

```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

> **Nota:** Reemplaza `tu_supabase_url` y `tu_supabase_anon_key` con las credenciales de tu proyecto en Supabase.

---

## Cómo Usar el Proyecto

### Comandos Disponibles

#### **Modo Desarrollo**

Inicia el servidor de desarrollo con Hot Module Replacement (HMR):

```bash
npm run dev
```

El proyecto estará disponible en: `http://localhost:5173`

#### **Compilar para Producción**

Compila el proyecto optimizado para producción:

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`.

#### **Previsualizar Build de Producción**

Previsualiza la versión de producción localmente:

```bash
npm run preview
```

#### **Linting**

Ejecuta ESLint para verificar y corregir problemas de código:

```bash
npm run lint
```

---

## Estructura del Proyecto

El proyecto sigue una **arquitectura en capas** basada en principios de Clean Architecture, separando responsabilidades y facilitando el mantenimiento:

```
Habitta/
├── public/                      # Archivos estáticos públicos (iconos, imágenes)
├── src/
│   ├── application/             # Capa de Aplicación
│   │   ├── context/             # Contextos de React (AuthContext, etc.)
│   │   ├── hooks/               # Custom Hooks reutilizables
│   │   └── services/            # Servicios de lógica de negocio
│   │
│   ├── domain/                  # Capa de Dominio
│   │   ├── entities/            # Modelos y entidades del dominio
│   │   └── enums/               # Enumeraciones y constantes
│   │
│   ├── infrastructure/          # Capa de Infraestructura
│   │   ├── api/                 # Llamadas a APIs externas
│   │   └── supabase/            # Configuración y cliente de Supabase
│   │
│   ├── presentation/            # Capa de Presentación
│   │   ├── components/          # Componentes reutilizables (Navbar, Footer, Modals)
│   │   └── pages/               # Páginas de la aplicación
│   │       ├── home/            # Página principal
│   │       ├── auth/            # Autenticación (Login/Registro)
│   │       ├── properties/      # Exploración de propiedades
│   │       ├── registerpropeties/ # Registro de nuevas propiedades
│   │       ├── promotion/       # Planes de promoción
│   │       ├── myPanel/         # Panel de usuario (favoritos, propiedades)
│   │       ├── notification/    # Sistema de notificaciones
│   │       ├── tools/           # Herramientas adicionales
│   │       └── userRegister/    # Registro de usuarios
│   │
│   ├── App.tsx                  # Componente principal con enrutamiento
│   ├── App.css                  # Estilos globales de la aplicación
│   └── main.tsx                 # Punto de entrada de la aplicación
│
├── .env                         # Variables de entorno (no incluido en Git)
├── package.json                 # Dependencias y scripts del proyecto
├── tsconfig.json                # Configuración de TypeScript
├── vite.config.ts               # Configuración de Vite
└── README.md                    # Este archivo
```

### **Descripción de Capas**

- **`presentation/`**: Contiene todos los componentes visuales y páginas de la interfaz de usuario.
- **`application/`**: Gestiona la lógica de aplicación, contextos globales y hooks personalizados.
- **`domain/`**: Define las entidades del negocio y reglas de dominio.
- **`infrastructure/`**: Se comunica con servicios externos (Supabase, APIs).

---

## Funcionalidades Principales

### Autenticación de Usuarios

- Registro e inicio de sesión con confirmación por correo electrónico
- Gestión de estado de autenticación con React Context
- Integración completa con Supabase Auth

### Gestión de Propiedades

- Exploración y búsqueda de propiedades disponibles
- Registro de nuevas propiedades con formularios validados
- Sistema de favoritos para guardar propiedades de interés

### Planes de Promoción

- Planes Basic, Premium y Ultra para promocionar propiedades
- Modales interactivos para selección de planes
- Visualización clara de beneficios por plan

### Sistema de Notificaciones

- Notificaciones en tiempo real
- Modal de vista rápida de notificaciones desde el Navbar
- Página dedicada para gestión completa de notificaciones

### Panel de Usuario

- Navegación por pestañas (Mis Propiedades, Favoritos)
- Modal de perfil de usuario
- Interfaz responsive y moderna

---

## Estado del Proyecto

🟢 **En desarrollo activo** - Versión 0.0.0

El proyecto se encuentra en desarrollo continuo con actualizaciones frecuentes. Nuevas funcionalidades y mejoras están siendo implementadas regularmente.

---

## Autores

- **Stiven Medina** - Desarrollador Principal - [@MRstiven232004](https://github.com/MRstiven232004)
- **Julian Acero** - Colaborador - [@JulianAcero252](https://github.com/JulianAcero252)
- **Brayan Perilla** - Colaborador - [@brayanperilla](https://github.com/brayanperilla)

---

## Licencia

Este proyecto es privado y de uso personal/educativo.

---

## Soporte

Si tienes alguna pregunta o necesitas ayuda, puedes:

- Abrir un **Issue** en el repositorio
- Contactar al autor principal a través de GitHub

---

## Agradecimientos

- A **Juan Fernando** por las observaciones y retroalimentación del proyecto
- A la comunidad de **React** y **Supabase** por su excelente documentación
- A todos los colaboradores y testers que han ayudado a mejorar esta plataforma

---

**¡Hecho con ❤️ para revolucionar la gestión inmobiliaria!**
