#!/bin/bash

# Exit on any error
set -e

# Load environment variables from .env.staging file
if [ -f .env.staging ]; then
  export $(cat .env.staging | xargs)
else
  echo ".env.staging file not found"
  exit 1
fi

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "Docker does not seem to be running, start it first and retry"
    exit 1
fi

# Build the Docker images
echo "Building Docker images for staging environment..."
docker-compose -f docker-compose.staging.yml build

# Run the Docker containers
echo "Starting Docker containers for staging environment..."
docker-compose -f docker-compose.staging.yml up -d

# Run database migrations
echo "Running database migrations..."
docker-compose -f docker-compose.staging.yml run backend npx sequelize-cli db:migrate

# Seed the database with initial data
echo "Seeding the database with initial data..."
docker-compose -f docker-compose.staging.yml run backend npx sequelize-cli db:seed:all

echo "Staging environment setup complete."
echo "Visit the application at http://localhost:${PORT}"