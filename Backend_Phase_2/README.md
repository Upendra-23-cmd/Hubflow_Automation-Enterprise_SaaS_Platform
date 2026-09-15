# Hubflow Automation Backend

Backend API for Hubflow Automation SaaS built using Node.js, Express, Prisma, MySQL, JWT authentication, and Swagger.

## Tech Stack
- **Node.js & Express.js**
- **Prisma ORM** with **MySQL**
- **JWT** (JSON Web Tokens) for auth
- **express-validator** for request validation
- **Swagger UI** for API documentation
- **Docker & Docker Compose** for deployment

---

## Project Structure

The project follows a standard layered MVC structure:

- `src/controllers`: Handles HTTP requests and sends back responses.
- `src/services`: Contains the core business logic (auth, campaigns, contacts, AI suggestions, queue processing).
- `src/repositories`: Handles database queries using Prisma.
- `src/routes`: Defines API endpoints and connects validators & controllers.
- `src/middlewares`: Auth check, validation result interceptor, and global error handling.
- `src/validators`: Request body and parameter rules.
- `src/utils`: JWT helpers, custom error classes, response formatters, and logger.
- `prisma/schema.prisma`: Database schema definitions for users, OTPs, contacts, and campaigns.

---

## Database ER Diagram

```mermaid
erDiagram
    users ||--o{ otp_codes : has
    users ||--o{ contacts : owns
    users ||--o{ campaigns : creates

    users {
        string id PK
        string name
        string email UK
        string password
        string role
    }

    otp_codes {
        string id PK
        string userId FK
        string code
        datetime expiresAt
        boolean isUsed
    }

    contacts {
        string id PK
        string userId FK
        string name
        string phone
        string email
        string tags
        string status
    }

    campaigns {
        string id PK
        string userId FK
        string name
        string message
        string status
        datetime scheduledAt
        int totalSent
        int totalDelivered
    }
```

---

## API Endpoints

All endpoints are prefixed with `/api/v1`.

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token
- `POST /auth/forgot-password` - Request a password reset OTP code
- `POST /auth/verify-otp` - Verify OTP and update password

### Contacts (CRM)
- `POST /contacts` - Create a contact
- `GET /contacts` - List contacts (supports search and page queries)
- `GET /contacts/:id` - Get contact details
- `PUT /contacts/:id` - Update contact
- `DELETE /contacts/:id` - Delete contact

### Campaigns & WhatsApp Integration
- `POST /campaigns` - Create a campaign
- `GET /campaigns` - List campaigns
- `GET /campaigns/:id` - Get campaign details
- `PUT /campaigns/:id` - Update campaign
- `DELETE /campaigns/:id` - Delete campaign
- `POST /campaigns/:id/send` - Send campaign (queues message processing in the background)

### Dashboard
- `GET /dashboard/stats` - Get summary stats (total contacts, total campaigns, active campaigns)

### AI Module
- `POST /ai/suggest-message` - Get marketing message copy suggestions

---

## Environment Setup

Create a `.env` file in the root directory (or copy from `.env.example`):

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="mysql://root:rootpassword@localhost:3306/hubflow_db"
JWT_SECRET="hubflow_super_secret_jwt_key_2026"
JWT_EXPIRES_IN="1d"
```

---

## Local Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate Prisma client:**
   ```bash
   npm run prisma:generate
   ```

3. **Push schema to MySQL database:**
   ```bash
   npm run prisma:db-push
   ```

4. **Run the server:**
   - Development mode:
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

---

## Running with Docker

You can run the API along with a MySQL database using Docker Compose:

```bash
docker-compose up --build -d
```

The server will run at `http://localhost:3000`.

---

## Swagger API Documentation & Postman

- **Swagger Docs**: Visit `http://localhost:3000/api-docs` after starting the server.
- **Postman Collection**: Import `postman_collection.json` into Postman to test all endpoints.
