# Auth Backend API

A lightweight Express.js REST API designed for user authentication. It features login and registration endpoints with JWT-based authorization and in-memory data persistence for quick testing and development.

## 🚀 Features

- **User Registration**: Create new accounts with validation (email and password).
- **User Login**: Authenticate users and generate JWT tokens.
- **JWT Authorization**: Secure communication between client and server.
- **In-Memory Storage**: Simple setup without the need for an external database.
- **CORS Enabled**: Ready to be consumed by different front-end applications.

## 🛠️ Technologies Used

- **Node.js**: Runtime environment.
- **Express.js**: Web framework for building the API.
- **JSON Web Token (JWT)**: Secure user session management.
- **CORS**: Cross-Origin Resource Sharing support.
- **Dotenv**: Environment variable management.

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Navigate to the project directory:
   ```bash
   cd BackendLab
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the API

Start the server in development mode:
```bash
npm run dev
```

The API will be running at `http://localhost:3333`.

## 📡 API Endpoints

- **POST `/register`**: Create a new user (requires `name`, `email`, `password`).
- **POST `/login`**: Authenticate user and receive a token (requires `email`, `password`).
