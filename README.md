# Kanban Board Application

A Kanban board application built with **React**, **TypeScript**, **Vite**, and **Axios**.

## Features

- **Task Management**: Create, read, update, and delete tasks (CRUD).
- **Kanban Columns**: Automatically organizes tasks into three columns: **Open**, **In Progress**, and **Done**.
- **Quick Status Moves**: Easily move tasks forward or backward through statuses using action buttons.
- **Modal Form**: Dynamic modal used for both creating new tasks and editing existing ones.
- **REST API Integration**: Synchronizes state with a backend server via `Axios`.

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: Modern CSS (Flexbox / CSS Grid)

## API Structure

The application communicates with a backend REST service on the `/api/todo` base URL.

| Method   | Endpoint               | Description             |
|----------|------------------------|-------------------------|
| `GET`    | `/api/todo`            | Fetch all tasks         |
| `POST`   | `/api/todo`            | Create a new task       |
| `PUT`    | `/api/todo/:id/update` | Update an existing task |
| `DELETE` | `/api/todo/:id`        | Delete a task by ID     |

### Task Model

```typescript
type Status = "OPEN" | "IN_PROGRESS" | "DONE";

type Task = {
    id: string;
    description: string;
    status: Status;
};
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/kanban-board.git
   cd kanban-board
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Backend Proxy (Vite):**
   Ensure your local backend server is running. If your backend runs on a port like `http://localhost:8080`, check or
   update your proxy configuration in `vite.config.ts`:

   ```typescript
   // vite.config.ts
   import { defineConfig } from 'vite';
   import react from '@vitejs.plugin-react';

   export default defineConfig({
     plugins: [react()],
     server: {
       proxy: {
         '/api': {
           target: 'http://localhost:8080',
           changeOrigin: true,
         },
       },
     },
   });
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` – Runs the app in development mode.
- `npm run build` – Compiles TypeScript and builds the app for production.
- `npm run preview` – Previews the production build locally.