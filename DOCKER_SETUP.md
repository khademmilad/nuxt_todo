# Docker Setup Guide

## Quick Start

Run everything with a single command:

```bash
docker compose up
```

This will start:
- **Keycloak** on http://localhost:8080
- **Nuxt Todo App** on http://localhost:3000
- **PostgreSQL** for the app (port 5432)
- **PostgreSQL** for Keycloak (internal)

## First Time Setup

### 1. Configure Keycloak

1. Access Keycloak admin console: http://localhost:8080
   - Username: `admin`
   - Password: `admin`

2. Create a new realm:
   - Click "Create Realm"
   - Name: `nuxt-realm`
   - Click "Create"

3. Create a client:
   - Go to "Clients" → "Create client"
   - Client ID: `nuxt-todo-app`
   - Client Protocol: `openid-connect`
   - Click "Next"
   
4. Configure client:
   - Client authentication: **ON**
   - Authorization: **OFF**
   - Authentication flow: Check "Standard flow" and "Direct access grants"
   - Click "Next"
   
5. Set valid redirect URIs:
   - Valid redirect URIs: `http://localhost:3000/*`
   - Valid post logout redirect URIs: `http://localhost:3000/*`
   - Web origins: `http://localhost:3000`
   - Click "Save"

6. Get client secret:
   - Go to "Credentials" tab
   - Copy the "Client secret"
   - Update `.env` file with this secret:
     ```
     KEYCLOAK_CLIENT_SECRET=<paste-secret-here>
     ```

7. Generate AUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```
   Update `.env` with the generated secret:
   ```
   AUTH_SECRET=<paste-generated-secret>
   ```

8. Create a test user (optional):
   - Go to "Users" → "Create new user"
   - Fill in username, email, first name, last name
   - Click "Create"
   - Go to "Credentials" tab → "Set password"
   - Set a password and turn off "Temporary"

### 2. Restart the Nuxt App

After configuring Keycloak and updating `.env`:

```bash
docker compose restart nuxt-app
```

## Useful Commands

```bash
# Start all services
docker compose up

# Start in detached mode (background)
docker compose up -d

# Stop all services
docker compose down

# Stop and remove volumes (fresh start)
docker compose down -v

# View logs
docker compose logs -f

# View logs for specific service
docker compose logs -f nuxt-app
docker compose logs -f keycloak

# Rebuild the Nuxt app
docker compose build nuxt-app

# Restart a specific service
docker compose restart nuxt-app
```

## Database Access

The Nuxt app database is accessible at:
- Host: `localhost`
- Port: `5432`
- Database: `nuxt_todo`
- User: `postgres`
- Password: `milad`

## Troubleshooting

### App can't connect to Keycloak
- Make sure Keycloak is fully started (check logs: `docker compose logs keycloak`)
- Verify the realm name matches: `nuxt-realm`
- Check that the client is configured correctly

### Database connection issues
- Ensure PostgreSQL is healthy: `docker compose ps`
- Check logs: `docker compose logs postgres-app`

### Need to reset everything
```bash
docker compose down -v
docker compose up --build
```
