# Nuxt Todo App with SSO (Keycloak)

A full-stack Todo application built with Nuxt 3, featuring Single Sign-On (SSO) authentication via Keycloak, PostgreSQL database, and containerized deployment with Docker.

## Features

- ✅ Todo CRUD operations
- 🔐 SSO Authentication with Keycloak
- 🐳 Dockerized deployment
- 🗄️ PostgreSQL database
- 🎨 Modern UI with Vue 3 Composition API
- 📦 State management with Pinia
- 🔧 Type-safe with TypeScript

## Tech Stack

### Frontend & Framework
- **Nuxt** (v4.1.2) - Vue.js framework for production
- **Vue 3** (v3.5.22) - Progressive JavaScript framework
- **Vue Router** (v4.5.1) - Official router for Vue.js

### State Management
- **Pinia** (v3.0.3) - Vue Store
- **@pinia/nuxt** (v0.11.2) - Pinia module for Nuxt

### Database & ORM
- **PostgreSQL** (16-alpine) - Relational database
- **Knex.js** (v3.1.0) - SQL query builder
- **pg** (v8.16.3) - PostgreSQL client for Node.js

### Authentication
- **Keycloak** - Open source identity and access management

### DevOps & Tools
- **Docker & Docker Compose** - Containerization
- **dotenv** (v17.2.3) - Environment variable management
- **TypeScript** - Type safety

## Prerequisites

Before running this project, make sure you have installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd nuxt_todo_sso
```

### 2. Configure Environment Variables

Copy the example environment file and update it with your values:

```bash
cp .env.example .env
```

Edit `.env` file with your configuration:

```env
# Database Configuration for Nuxt App
DB_HOST=postgres-nuxt
DB_PORT=5432
DB_NAME=nuxt_todo
DB_USER=postgres
DB_PASSWORD=your-secure-password

# Database Configuration for Keycloak
KEYCLOAK_DB_NAME=keycloak
KEYCLOAK_DB_USER=keycloak
KEYCLOAK_DB_PASSWORD=your-keycloak-password

# Keycloak Admin Credentials
KEYCLOAK_ADMIN=admin
KEYCLOAK_ADMIN_PASSWORD=your-admin-password

# Application Configuration
API_BASE=http://localhost:3000
API_SECRET=your-api-secret
NODE_ENV=production

# Authentication Secret (generate with: openssl rand -base64 32)
AUTH_SECRET=your-generated-secret

# Auth Origin
AUTH_ORIGIN=http://localhost:3000

# Keycloak Configuration
KEYCLOAK_CLIENT_ID=nuxt-todo-app
KEYCLOAK_CLIENT_SECRET=your-client-secret
KEYCLOAK_ISSUER=http://keycloak:8080/realms/nuxt-realm
```

### 3. Install Dependencies (for local development)

```bash
npm install
```

### 4. Start with Docker Compose

Start all services (PostgreSQL for Nuxt, PostgreSQL for Keycloak, Keycloak, and Nuxt app):

```bash
docker compose up -d
```

This will start:
- **Nuxt App** on `http://localhost:3000`
- **Keycloak Admin Console** on `http://localhost:8080`
- **PostgreSQL** for Nuxt (internal)
- **PostgreSQL** for Keycloak (internal)

### 5. Configure Keycloak

1. Access Keycloak Admin Console: `http://localhost:8080`
2. Login with credentials from `.env` (default: admin/admin)
3. Create a new realm named `nuxt-realm`
4. Create a new client:
   - Client ID: `nuxt-todo-app` (must match `KEYCLOAK_CLIENT_ID` in `.env`)
   - Client Protocol: `openid-connect`
   - Access Type: `confidential`
   - Valid Redirect URIs: `http://localhost:3000/*`
5. Get the client secret from the Credentials tab
6. Update `KEYCLOAK_CLIENT_SECRET` in `.env` with the generated secret

### 6. Run Database Migrations

```bash
npm run migrate
```

Or if using Docker:

```bash
docker exec nuxt-todo-app npm run migrate
```

### 7. Access the Application

Open your browser and navigate to:
- **Application**: `http://localhost:3000`
- **Keycloak Admin**: `http://localhost:8080`

## Development Mode

For local development without Docker:

1. Make sure PostgreSQL is running locally
2. Update `.env` with local database credentials:
   ```env
   DB_HOST=localhost
   NODE_ENV=development
   ```
3. Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Docker Commands

### Stop all containers
```bash
docker compose down
```

### View logs
```bash
docker compose logs -f
```

### View specific service logs
```bash
docker compose logs -f nuxt-app
docker compose logs -f keycloak
```

### Rebuild containers
```bash
docker compose up -d --build
```

### Remove all containers and volumes
```bash
docker compose down -v
```

## Project Structure

```
nuxt_todo_sso/
├── app/
│   ├── components/       # Vue components
│   ├── composables/      # Vue composables
│   ├── layouts/          # Layout templates
│   ├── pages/            # Route pages
│   └── stores/           # Pinia stores
├── lib/                  # Database configuration
├── migrations/           # Database migrations
├── server/
│   └── api/              # API endpoints
├── docker-compose.yml    # Docker services configuration
├── Dockerfile            # Nuxt app container
├── knexfile.cjs         # Knex configuration
├── nuxt.config.ts       # Nuxt configuration
└── .env                 # Environment variables (not in git)
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | Database host | `postgres-nuxt` |
| `DB_PORT` | Database port | `5432` |
| `DB_NAME` | Database name | `nuxt_todo` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `your-password` |
| `KEYCLOAK_CLIENT_ID` | Keycloak client ID | `nuxt-todo-app` |
| `KEYCLOAK_CLIENT_SECRET` | Keycloak client secret | `generated-secret` |
| `KEYCLOAK_ISSUER` | Keycloak issuer URL | `http://keycloak:8080/realms/nuxt-realm` |
| `AUTH_SECRET` | Auth session secret | `generated-secret` |

## Troubleshooting

### Cannot access ports 3000 or 8080
Make sure Docker containers are running:
```bash
docker compose ps
```

If they're not running:
```bash
docker compose up -d
```

### Database connection errors
Check if PostgreSQL containers are healthy:
```bash
docker compose ps
```

View logs:
```bash
docker compose logs postgres-nuxt
```

### Keycloak authentication issues
1. Verify Keycloak is accessible at `http://localhost:8080`
2. Check that the realm and client are configured correctly
3. Ensure `KEYCLOAK_CLIENT_SECRET` in `.env` matches the value in Keycloak

## License

MIT

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

