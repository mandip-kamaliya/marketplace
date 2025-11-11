# Marketplace Backend (Node.js + TypeScript + MySQL + Sequelize)

Backend modules for a multi-role marketplace (Seller, DeliveryPerson, Salesman, Customer) with JWT auth and Swagger docs.

## Tech Stack
- Node.js, TypeScript, Express
- Sequelize + MySQL (sequelize-typescript)
- Swagger (OpenAPI 3.0)
- Zod validation
- Multer uploads

## Getting Started
1. Copy `.env.example` to `.env` and adjust values.
2. Start MySQL via Docker:
   ```bash
   docker compose up -d
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run dev server:
   ```bash
   npm run dev
   ```
5. Open Swagger: http://localhost:4000/api-docs

## Project Structure
```
src/
  app.ts
  server.ts
  config/
    env.ts
  db/
    sequelize.ts
  models/
  routes/
    index.ts
  docs/
    swagger.ts
```

## Seed Data
Seed scripts will be added to create sample users, roles, products, and orders.

## Hours Taken
TBD. Will be updated upon completion of core modules.

## AI Usage Disclosure
I used an AI assistant to scaffold boilerplate (project structure, config, and initial files) to accelerate setup, then I will implement models and APIs manually with reviews.
