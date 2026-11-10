# TaskFlow — Gestor de tareas minimalista ✅

Aplicación de gestión de tareas enfocada en claridad y velocidad: prioridades, filtros, progreso en tiempo real y modo oscuro. Todo persiste en el navegador, sin backend.

![TaskFlow en modo oscuro](docs/preview-dark.png)

## ✨ Funcionalidades

- **CRUD completo** de tareas: crear, editar en línea (doble clic), completar y eliminar
- **Prioridades** (baja / media / alta) con indicador de color
- **Filtros** por estado: todas, activas y completadas
- **Anillo de progreso** que se actualiza en tiempo real
- **Persistencia local** con `localStorage` (tus tareas siguen ahí al recargar)
- **Modo claro / oscuro** con preferencia guardada
- **Microinteracciones**: animaciones sutiles al agregar, completar y pasar el cursor

## 🛠️ Stack

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

## 🏗️ Arquitectura

```
src/
├── components/     # UI por responsabilidad (Header, Composer, Filters, TaskItem…)
├── hooks/          # Lógica reutilizable (useTasks, useTheme, useLocalStorage)
├── types.ts        # Modelo de dominio (Task, Priority, Filter)
└── App.tsx         # Composición de la vista
```

Estado y persistencia viven en hooks desacoplados de la UI, de modo que los componentes se mantienen declarativos y fáciles de testear.

## 🚀 Ejecución local

```bash
git clone https://github.com/Sagudelo01/task-flow.git
cd task-flow
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

### Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción |
| `npm run preview` | Previsualiza el build |
| `npm run lint` | Linter (Oxlint) |

## 🖼️ Modo claro

![TaskFlow en modo claro](docs/preview-light.png)
