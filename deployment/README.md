# Deployment Guide for Olvy Cap Table Management Software

This document provides instructions for setting up the development, staging, and production environments for the Olvy Cap Table Management software. Follow these steps to deploy the application in your desired environment.

## Prerequisites

Before proceeding with the setup, ensure that you have the following installed on your system:
- Node.js (LTS version)
- MongoDB (Local or Atlas URI)
- Git (for version control)

## Development Environment Setup

1. Clone the repository to your local machine:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd <project-directory>
   ```

3. Install the dependencies for the backend:
   ```
   cd backend
   npm install
   ```

4. Install the dependencies for the frontend:
   ```
   cd ../frontend
   npm install
   ```

5. Create a `.env` file in the backend directory with the following content:
   ```
   DATABASE_URL=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=5000
   ```

6. Start the backend server:
   ```
   cd ../backend
   npm start
   ```

7. Start the frontend development server:
   ```
   cd ../frontend
   npm start
   ```

8. The application should now be running on `http://localhost:3000`.

## Staging Environment Setup

Refer to `staging_setup.sh` for automated staging environment setup. Ensure that you have the necessary environment variables set up as per the `.env.example` file.

## Production Environment Setup

Refer to `production_setup.sh` for automated production environment setup. Ensure that you have the necessary environment variables set up as per the `.env.example` file.

## Additional Information

- The backend API will be available at `http://localhost:5000/api`.
- The frontend will proxy requests to the backend, so no CORS issues should arise during development.
- For production, ensure that you build the frontend using `npm run build` and serve the static files with a web server or integrate with the backend to serve the frontend.

## Testing

To run the automated tests for the backend, navigate to the backend directory and run:
```
npm test
```

Ensure that all tests pass before moving to a higher environment.

## Deployment

After setting up the staging or production environment, you can deploy the application using the following steps:

1. Build the frontend for production:
   ```
   cd frontend
   npm run build
   ```

2. Copy the build files to the backend or a web server directory as needed.

3. Start the backend server (for production, consider using a process manager like PM2):
   ```
   cd ../backend
   npm run prod
   ```

4. The application should now be accessible on the configured port and host.

For detailed API endpoints and usage, refer to `api_documentation.md`. For understanding the database schema, refer to `database_schema.md`.

For any issues during deployment, please refer to the troubleshooting section in the `README.md` file or contact the support team.