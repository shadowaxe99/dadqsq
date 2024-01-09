#!/bin/bash

# Exit script on any error
set -e

# Production setup script for Olvy cap table management software

# Load environment variables from .env file
if [ -f ../backend/.env.production ]; then
  export $(cat ../backend/.env.production | xargs)
else
  echo "Production environment file not found!"
  exit 1
fi

# Ensure that the script is run as root
if [ "$(id -u)" != "0" ]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi

# Update package list and upgrade existing packages
apt-get update
apt-get -y upgrade

# Install Node.js and npm if not already installed
if ! command -v node > /dev/null; then
  curl -sL https://deb.nodesource.com/setup_14.x | bash -
  apt-get install -y nodejs
fi

# Install MongoDB if not already installed
if ! command -v mongod > /dev/null; then
  wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
  echo "deb http://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list
  apt-get update
  apt-get install -y mongodb-org
  systemctl start mongod
  systemctl enable mongod
fi

# Install PM2 to run the node app as a service
npm install pm2@latest -g

# Navigate to backend directory and install dependencies
cd ../backend
npm install --production

# Navigate to frontend directory and install dependencies
cd ../frontend
npm install --production

# Build the frontend for production
npm run build

# Serve the frontend build using a static server
npm install -g serve
serve -s build -l 3000 &

# Start the backend with PM2
cd ../backend
pm2 start server.js --name olvy-backend --time

# Set up reverse proxy with Nginx
apt-get install -y nginx
cat > /etc/nginx/sites-available/olvy <<EOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

ln -s /etc/nginx/sites-available/olvy /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
systemctl restart nginx

# Set up SSL with Let's Encrypt (optional)
# apt-get install -y python3-certbot-nginx
# certbot --nginx -d yourdomain.com

echo "Production setup complete. Olvy is now running on the server."