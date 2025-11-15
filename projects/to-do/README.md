# To-Do App

A simple full-stack To-Do application with a JWT-protected API and a React frontend.

## Features
- JWT-authenticated API (demo user)
- CRUD for todos (create, read, update, delete)
- MongoDB persistence (Mongoose)
- Axios-based frontend
- Docker Compose for local orchestration

## Tech Stack
- Frontend: React 18, Vite, Axios
- Backend: Node.js, Express 5, MongoDB, Mongoose, JWT, CORS
- Dev: Nodemon, ESLint, Docker Compose

## Prerequisites
- Node.js (v16+), npm
- MongoDB (local or cloud)
- Docker (optional)

## Quick Start
1. Clone
```bash
git clone <repository-url>
cd to-do
```

2. Backend setup
```bash
cd backend
npm install
```
Create `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```
Run:
```bash
npm run dev
```

3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```
API base URL (adjust if needed): `frontend/src/services/api.js`
const API_BASE_URL = ' http://localhost:5000/api ';

Open: `http://localhost:5173`

## Docker Compose
From project root:
```bash
docker-compose up --build
```
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3001`

## Project Structure
```
├── README.md
├── backend/
│   ├── Dockerfile
│   ├── jest.config.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── Todo.js
│   ├── package.json
│   ├── routes/
│   │   ├── auth.js
│   │   └── todos.js
│   └── server.js
├── docker-compose.yml
└── frontend/
├── Dockerfile
├── index.html
├── package.json
└── src/
├── App.jsx
├── hooks/
└── services/
```

## API Endpoints
- Auth (demo): `POST /api/login` (username: `admin`, password: `123456`)
- Todos (require JWT):
  - `GET /api/todos`
  - `POST /api/todos`
  - `GET /api/todos/:id`
  - `PUT /api/todos/:id`
  - `DELETE /api/todos/:id`

## Scripts
- Backend: `npm run dev`, `npm start`
- Frontend: `npm run dev`, `npm run build`