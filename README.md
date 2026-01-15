# 💬 Ephemeral Real-Time Chat

A simple chat application featuring persistent user authentication and real-time ephemeral messaging. Built with Next.js, Socket.io, and PostgreSQL.

## 🏗️ Architecture Overview

This app utilizes a hybrid data strategy designed for privacy and speed:

* **Persistent Layer (PostgreSQL):** All user accounts, auth profiles, and credentials are stored in a PostgreSQL database.

* **Ephemeral Layer (Socket.io):** Real-time message broadcasting and in-memory caching. Messages are not stored in the database, ensuring a zero-footprint messaging experience.

## 🚀 Tech Stack

* **Framework:** Next.js 15 (App Router, TypeScript)

* **Real-Time Engine:** Socket.io (In-memory message caching)

* **Database:** PostgreSQL (Running in Docker)

* **ORM:** Prisma

* **Authentication:** Auth.js (GitHub, Google, & Credentials)

* **UI & Styling:** shadcn/ui & Tailwind CSS

## 🛠️ Installation & Setup

### 1. Environment Variables

Create a .env file in the root directory:
PostgreSQL (Docker)
```bash
POSTGRES_USER=...
POSTGRES_PASSWORD=...
POSTGRES_DB=...
DATABASE_URL="..."

SOCKET_SERVER_URL="http://localhost:8080"
```

Create a .env.local file in the root directory: 
Auth.js
```bash
AUTH_SECRET="your_secret_key"
AUTH_GITHUB_ID=your_id
AUTH_GITHUB_SECRET=your_secret
AUTH_GOOGLE_ID=your_id
AUTH_GOOGLE_SECRET=your_secret
```

### 2. Infrastructure (Docker)

Launch the database container. The configuration includes a volume for user data persistence so accounts remain even after a container reset.
```bash
docker-compose up -d
```

### 3. Database Schema

Push the Prisma schema to your PostgreSQL instance to create the user tables:
```bash
npm install

npx prisma migrate dev --name init_user_system
```

### 4. Running the Project

The project requires both the Next.js app and the Socket backend to be active:

Terminal 1: Next.js Frontend
```bash
npm run dev
```

Terminal 2: Socket.io Backend Server
```bash
cd ./socket-server
npm start
```

## 🛡️ Key Features

* **Hybrid Auth:** Secure login via Social Providers (Google/GitHub) or traditional Email/Password credentials.

* **Persistent Users:** User profiles are saved to a PSQL database.

* **Live Chat:** Real-time communication with optimized broadcasting.

* **Zero-Footprint Messaging:** Chat history exists only in limited server memory—once the server restarts, the cache is cleared.
