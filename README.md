# grocery-booking-system
Node.js (TypeScript) REST API for a grocery booking system with inventory management, order processing, and Dockerized PostgreSQL setup.

## Environment Setup

Copy the example file and update values:

```bash
cp .env.example .env
```

## Run with Docker (PostgreSQL)
```bash
docker-compose up -d
```

Then run the app locally:
```bash
npm install
npm run dev
```