# Data Normalizer

A TypeScript-powered tool for array data transformation and normalization. This project provides a set of services and utilities to convert raw data into standardized formats, making it easier to process and export.

## 🚀 Features

- **Data Transformation**: Convert complex data structures into a simplified format.
- **Normalization Engine**: Standardize inconsistent fields across multiple datasets.
- **JSON Export**: Export normalized data to JSON files for external use.
- **Strongly Typed**: Built with TypeScript for reliable data handling.
- **Modular Design**: Separated concerns into services, types, and utils.

## 🛠️ Technologies Used

- **TypeScript**: Core programming language.
- **Node.js**: Runtime environment.
- **ts-node**: Execute TypeScript directly in development.

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed.

### Installation

1. Navigate to the project directory:
   ```bash
   cd data-normalizer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Tool

To run the normalization process in development mode:
```bash
npm run dev
```

To build the project:
```bash
npm run build
```

## 📂 Project Structure

- `src/data`: Source files for raw data inputs.
- `src/services`: Core logic for data conversion.
- `src/types`: TypeScript interfaces and type definitions.
- `src/utils`: Helper functions for exporting and logging.
