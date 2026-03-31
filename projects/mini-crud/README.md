# Mini CRUD TypeScript

A lightweight and efficient CRUD implementation built with TypeScript. This project showcases a clean architecture for managing user data with in-memory persistence, perfect for understanding core backend operations.

## 🚀 Features

- **Full CRUD Support**: Manage user records with create, read, update, and delete actions.
- **In-Memory Storage**: Instant testing without external database dependencies.
- **Strong Typing**: User models and services defined with TypeScript.
- **Separation of Concerns**: Logic divided into data, models, and services.

## 🛠️ Technologies Used

- **TypeScript**: Core programming language.
- **Node.js**: Runtime environment.

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed.

### Installation

1. Navigate to the project directory:
   ```bash
   cd mini-crud
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To build and run the project:
```bash
npm run build
npm start
```

## 📂 Project Structure

- `src/data`: In-memory data storage and initial records.
- `src/models`: Type definitions for application objects.
- `src/services`: Business logic for CRUD operations.
- `src/index.ts`: Entry point of the application.
