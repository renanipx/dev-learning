# Simple API Python

A high-performance CRUD API built with FastAPI and SQLite. This project demonstrates a simple but robust backend structure with persistent data storage and asynchronous operations.

## 🚀 Features

- **Full CRUD Support**: Create, Read, Update, and Delete items.
- **SQLite Integration**: Persistent data storage in a local database file.
- **Asynchronous Database Access**: Efficient performance with `aiosqlite`.
- **Automatic Documentation**: Interactive Swagger UI and ReDoc endpoints.
- **ID Validation**: Prevents duplicate IDs during item creation.

## 🛠️ Technologies Used

- **Python**: Core programming language.
- **FastAPI**: Modern, fast web framework for building APIs.
- **Uvicorn**: ASGI server implementation for Python.
- **aiosqlite**: Asynchronous interface to SQLite.
- **Pydantic**: Data validation and settings management.

## 📦 Getting Started

### Prerequisites

- [Python 3.7+](https://www.python.org/) installed.

### Setup

1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```
2. Install dependencies:
   ```bash
   pip install fastapi uvicorn aiosqlite
   ```

### Running the API

Start the server:
```bash
uvicorn main:app --reload
```

The API will be running at `http://localhost:8000`.

## 📡 API Endpoints

- **GET `/items/`**: List all items.
- **GET `/items/{id}`**: Get a specific item.
- **POST `/items/`**: Create a new item.
- **PUT `/items/{id}`**: Update an existing item.
- **DELETE `/items/{id}`**: Remove an item.

Access the interactive docs at `http://localhost:8000/docs`.
