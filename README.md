# Ditronics CMS

A modern, lightweight Content Management System built with Next.js for managing laptop inventory, contact inquiries, and business settings.

## Features

- 🖥️ **Laptop Inventory Management** - Add, edit, and delete laptops with detailed specifications
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 🔐 **Secure Admin Dashboard** - Password-protected admin area with bcrypt hashing
- 📬 **Contact Form & Inquiries** - Receive and manage customer inquiries
- ⚙️ **Dynamic Settings** - Configure WhatsApp, phone, email, and address from the dashboard
- 🗄️ **SQLite Database** - Simple, file-based database (no external database server needed)
- 🚀 **Fast & SEO Optimized** - Built with Next.js App Router and server components

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: SQLite (better-sqlite3)
- **Styling**: Tailwind CSS
- **Authentication**: Cookie-based sessions with bcrypt password hashing
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hackerman2003/my-raw-cms.git
   cd my-raw-cms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Default Admin Credentials

- **URL**: `http://localhost:3000/admin`
- **Username**: `admin`


> ⚠️ **Important**: Change the default password after first login!

## Project Structure

```
├── data/                   # SQLite database file
├── public/                 # Static assets (images, logos)
│   └── uploads/           # Uploaded laptop images
├── src/
│   ├── app/
│   │   ├── admin/         # Admin dashboard pages
│   │   ├── api/           # API routes
│   │   ├── contact/       # Contact page
│   │   ├── laptops/       # Laptop catalog & detail pages
│   │   └── ...
│   ├── components/        # Reusable UI components
│   └── lib/
│       ├── db.ts          # Database operations
│       └── utils.ts       # Utility functions
```

---

## Deployment on VPS

### Option 1: Using PM2 (Recommended)

#### Step 1: Prepare Your VPS

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version

# Install PM2 globally
sudo npm install -g pm2

# Install build tools (required for better-sqlite3)
sudo apt install -y build-essential python3
```

#### Step 2: Upload Your Project

```bash
# On your local machine, build the project
npm run build

# Create a tarball (excluding node_modules)
tar --exclude='node_modules' --exclude='.git' -czvf ditronics-cms.tar.gz .

# Upload to your VPS using scp
scp ditronics-cms.tar.gz user@your-vps-ip:/home/user/
```

#### Step 3: Setup on VPS

```bash
# SSH into your VPS
ssh user@your-vps-ip

# Create project directory
mkdir -p /var/www/ditronics-cms
cd /var/www/ditronics-cms

# Extract the project
tar -xzvf /home/user/ditronics-cms.tar.gz

# Install dependencies
npm install

# Build the project (if not already built)
npm run build

# Create data directory for database
mkdir -p data
```

#### Step 4: Start with PM2

```bash
# Start the application
pm2 start npm --name "ditronics-cms" -- start

# Save PM2 process list
pm2 save

# Setup PM2 to start on boot
pm2 startup
# (Follow the instructions it gives you)

# View logs
pm2 logs ditronics-cms

# Monitor the app
pm2 monit
```

#### Step 5: Setup Nginx Reverse Proxy

```bash
# Install Nginx
sudo apt install -y nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/ditronics-cms
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Increase max upload size for laptop images
    client_max_body_size 10M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/ditronics-cms /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

#### Step 6: Setup SSL with Let's Encrypt (HTTPS)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is set up automatically, but you can test it:
sudo certbot renew --dry-run
```

---

### Option 2: Using Docker

#### Step 1: Create Dockerfile

Create a `Dockerfile` in your project root:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies for better-sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/next.config.ts ./

# Create data directory for SQLite
RUN mkdir -p /app/data

EXPOSE 3000

CMD ["npm", "start"]
```

#### Step 2: Create docker-compose.yml

```yaml
version: '3.8'

services:
  ditronics-cms:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
      - ./public/uploads:/app/public/uploads
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

#### Step 3: Deploy with Docker

```bash
# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## Environment Variables (Optional)

Create a `.env.local` file for any custom configuration:

```env
# Optional: Change the port
PORT=3000

# Optional: Set Node environment
NODE_ENV=production
```

---

## PM2 Commands Reference

```bash
# Start the app
pm2 start npm --name "ditronics-cms" -- start

# Stop the app
pm2 stop ditronics-cms

# Restart the app
pm2 restart ditronics-cms

# View logs
pm2 logs ditronics-cms

# View status
pm2 status

# Delete from PM2
pm2 delete ditronics-cms
```

---

## Backup & Restore

### Backup Database

```bash
# The database is a single file
cp /var/www/ditronics-cms/data/ditronics.db /backup/ditronics-$(date +%Y%m%d).db
```

### Automated Daily Backup (Cron)

```bash
# Edit crontab
crontab -e

# Add this line for daily backup at 2 AM
0 2 * * * cp /var/www/ditronics-cms/data/ditronics.db /backup/ditronics-$(date +\%Y\%m\%d).db
```

### Restore Database

```bash
# Stop the app first
pm2 stop ditronics-cms

# Restore the database
cp /backup/ditronics-20241130.db /var/www/ditronics-cms/data/ditronics.db

# Start the app
pm2 start ditronics-cms
```

---

## Updating the Application

```bash
# SSH into your VPS
ssh user@your-vps-ip

# Navigate to project directory
cd /var/www/ditronics-cms

# Pull latest changes (if using git)
git pull origin main

# Or upload new tarball and extract

# Install any new dependencies
npm install

# Rebuild the application
npm run build

# Restart PM2
pm2 restart ditronics-cms
```

---

## Troubleshooting

### Common Issues

1. **better-sqlite3 build fails**
   ```bash
   sudo apt install -y build-essential python3
   npm rebuild better-sqlite3
   ```

2. **Permission denied on data folder**
   ```bash
   sudo chown -R $USER:$USER /var/www/ditronics-cms/data
   chmod 755 /var/www/ditronics-cms/data
   ```

3. **Port 3000 already in use**
   ```bash
   # Find process using port 3000
   sudo lsof -i :3000
   # Kill it
   sudo kill -9 <PID>
   ```

4. **Nginx 502 Bad Gateway**
   - Check if the app is running: `pm2 status`
   - Check app logs: `pm2 logs ditronics-cms`
   - Ensure proxy_pass port matches the app port

---

## Security Recommendations

1. ✅ Change the default admin password immediately
2. ✅ Use HTTPS (SSL certificate) in production
3. ✅ Keep Node.js and npm packages updated
4. ✅ Set up a firewall (UFW)
   ```bash
   sudo ufw allow ssh
   sudo ufw allow 'Nginx Full'
   sudo ufw enable
   ```
5. ✅ Regular database backups
6. ✅ Use strong passwords

---

## License

MIT License - feel free to use this project for your own purposes.

---

## Support

For issues or questions, please open an issue on GitHub or contact [info@ditronics.co.tz](mailto:info@ditronics.co.tz).
