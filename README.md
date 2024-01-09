# Olvy - Cap Table Management Software

Olvy is an AI-powered cap table management platform designed to streamline and automate the management of ownership records for startups and private companies. This repository contains the complete codebase for both the front-end and back-end components of the project, as well as detailed documentation and deployment scripts.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/olvy.git
   ```
2. Install front-end dependencies:
   ```
   cd frontend
   npm install
   ```
3. Install back-end dependencies:
   ```
   cd ../backend
   npm install
   ```

### Running the Application

To run the application locally, follow these steps:

1. Start the back-end server:
   ```
   cd backend
   npm start
   ```
2. In a new terminal, start the front-end application:
   ```
   cd frontend
   npm start
   ```

The application should now be running on `http://localhost:3000`.

### Testing

To run the automated tests for the back-end, use the following command:

```
cd backend
npm test
```

### Deployment

For instructions on setting up the development, staging, and production environments, refer to the deployment scripts in the `deployment` directory.

- [Development Setup](deployment/dev_setup.sh)
- [Staging Setup](deployment/staging_setup.sh)
- [Production Setup](deployment/production_setup.sh)

### Documentation

For a comprehensive guide to the project's architecture, API, and database schema, refer to the documentation files:

- [Product Requirements Document](PRD.md)
- [Architecture Diagram](docs/architecture_diagram.png)
- [System Flowchart](docs/system_flowchart.png)
- [API Documentation](docs/api_documentation.md)
- [Database Schema](docs/database_schema.md)

### Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### License

Distributed under the MIT License. See `LICENSE` for more information.

---

This project is designed to be fully functional and ready for commercial use. For any additional information or support, please refer to the detailed documentation provided within this repository.