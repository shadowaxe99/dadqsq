#!/bin/bash

# Exit script on any error
set -e

# Echo each command before executing it
set -x

# Check if MongoDB is installed
if ! command -v mongo &> /dev/null
then
    echo "MongoDB could not be found. Please install MongoDB."
    exit
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Node.js could not be found. Please install Node.js."
    exit
fi

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "npm could not be found. Please install npm."
    exit
fi

# Navigate to the backend directory and install dependencies
cd backend
npm install

# Copy the example environment file to set up environment variables for development
cp .env.example .env

# Generate a secret key for JWT and add it to the .env file
echo JWT_SECRET=$(openssl rand -base64 32) >> .env

# Start the MongoDB service
sudo service mongod start

# Navigate to the frontend directory and install dependencies
cd ../frontend
npm install

# Start the development server for the frontend
npm start &

# Navigate back to the backend directory and start the development server for the backend
cd ../backend
npm run dev &

# Both servers are now running in the background
echo "Development environment setup complete. Frontend and Backend servers are running."