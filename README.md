# Manifestation Journal Prototype

This repository contains the Manifestation Journal prototype.

## All-in-one Dev Startup

From the repo root, boot both backend and frontend without switching directories.

The backend listens on port 5002 by default, so the frontend will route API calls there.

```bash
npm install        # installs root, backend & frontend dependencies
npm run dev        # starts backend (5002) & frontend (3000) in parallel
```

---

## Manual Setup (optional)

If you ever need to install or run the services independently:

### Backend

```bash
cd backend
npm install
# configure environment variables in .env (set PORT to a free port if 5002 is in use)
# initialize the database schema
npx prisma db push
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Development Plan

Refer to the design document for detailed build plan and milestones.