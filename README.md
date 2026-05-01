# Grocery Booking System API
Node.js (TypeScript) REST API for a grocery booking system with inventory management, order processing, and Dockerized PostgreSQL setup.

## Tech Stack
- Node.js + Express
- TypeScript
- PostgreSQL
- Prisma ORM
- Docker

## Setup Instructions
```bash
git clone https://github.com/sumuongit/grocery-booking-system.git
npm install
cp .env.example .env
docker-compose up -d
npx prisma migrate dev
npm run dev
```
## API Endpoints

### Public
Get Items: GET /api/items

### Admin (Authorization Header Required)
Header:
x-role: ADMIN

- Create Item: POST /api/admin/items
- Update Item: PATCH /api/admin/items/{id}
- Delete Item: DELETE /api/admin/items/{id}
- Update Inventory: PATCH /api/admin/items/{id}/inventory

## Sample Request
POST /api/admin/items
```json
{
  "name": "Rice",
  "price": 50,
  "inventory": 100
}
```
## API Testing

Postman collection is available at:

/docs/postman_collection.json

Import into Postman and set:
base_url: http://localhost:5000/api
Replace `{id}` with the item ID returned from the create API

## Notes
- Simple role-based authorization implemented via header
- Input validation handled at controller level
- Modular structure (controller/service/routes)
- Prisma used for type-safe database access