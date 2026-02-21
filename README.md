# Expert Booking System

## Folder Structure

```
backend/
├── server.js              ← Entry point (Express + Socket.io)
├── seed.js                ← Seed DB with sample experts
├── .env.example           ← Copy to .env and fill in values
├── package.json
├── config/
│   └── db.js              ← MongoDB connection
├── models/
│   ├── Expert.js          ← Expert schema
│   └── Booking.js         ← Booking schema (unique index prevents double booking)
├── controllers/
│   ├── expertController.js
│   └── bookingController.js ← Race condition prevention via MongoDB transactions
├── routes/
│   ├── expertRoutes.js
│   └── bookingRoutes.js
└── middleware/
    └── errorHandler.js

ExpertBookingApp.jsx        ← Full React frontend (all 4 screens)
```

## Setup

### Backend
```bash
cd backend
cp .env.example .env       # Fill in MONGODB_URI and CLIENT_URL
npm install
node seed.js               # Seed sample expert data
npm run dev                # Starts on port 5000
```

### Frontend
Connect to the API by replacing mock data in ExpertBookingApp.jsx with real fetch calls to `http://localhost:5000/api/`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/experts?page=1&limit=9&category=Health&search=name | List experts |
| GET | /api/experts/:id | Expert detail + slots |
| POST | /api/bookings | Create booking |
| GET | /api/bookings?email=user@email.com | User's bookings |
| PATCH | /api/bookings/:id/status | Update status |

## Key Architecture Decisions

### Double Booking Prevention
- MongoDB compound unique index on `(expertId, date, timeSlot)` filtered to `pending`/`confirmed` status
- MongoDB session + transaction wraps the full check → book → remove-slot flow
- Catches the race condition even under concurrent requests; returns HTTP 409 if lost race

### Real-Time Slots
- Socket.io emits `slotBooked` / `slotRestored` events to all connected clients
- Frontend listens and marks slots as booked instantly without refresh

### Error Handling
- Mongoose validation errors → 400 with field-level messages
- Duplicate key errors → 409 Conflict
- CastError (bad ObjectId) → 400
- All others → 500 with stack logged server-side
