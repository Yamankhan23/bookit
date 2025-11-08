
# 🌍 Bookit – Adventure Booking Platform

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Express](https://img.shields.io/badge/Backend-Express-black?logo=express)
![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql)
![Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-blue?logo=netlify)
![Render](https://img.shields.io/badge/API%20Server-Render-purple?logo=render)

## 🧭 Project Overview

Bookit is a full-stack travel booking platform built with React (Vite) on the frontend and Node.js + Express + Prisma + PostgreSQL on the backend.  
It enables users to discover curated travel experiences, check real-time slot availability, and confirm bookings seamlessly with a modern UI and secure API integration.

---

## 📖 Table of Contents

1. [Features](#-features)  
2. [Folder Structure](#-folder-structure)  
3. [Tech Stack](#-tech-stack)  
4. [Setup Instructions](#-setup-instructions)  
   - [Backend Setup](#2️⃣-backend-setup)  
   - [Frontend Setup](#4️⃣-frontend-setup)  
5. [Environment Variables](#5️⃣-environment-variables-frontend)  
6. [Live Deployment](#-live-deployment)  
7. [API Testing](#-api-testing)  
8. [Developer](#-developer)  
9. [Notes & Best Practices](#-notes--best-practices)  
10. [Project Overview](#-project-overview)

---

## 🚀 Features

- Browse curated travel experiences with real-time availability  
- Dynamic slot updates and bookings per experience  
- Promo code support during checkout (`SAVE10`, `FLAT100`)  
- Responsive, pixel-perfect design built with TailwindCSS  
- Secure, scalable REST API with Prisma ORM and PostgreSQL  
- Full deployment pipeline via Render (server) and Netlify (client)  
- Modern file structure for maintainable, extensible code  
- Database visualization with Prisma Studio  

---

## 🧩 Folder Structure

```
bookit/
├── client/     # React + Vite frontend
└── server/     # Express + Prisma backend
```

---

## ⚙️ Tech Stack

**Frontend:** React (Vite), TailwindCSS, Axios, React Router  
**Backend:** Node.js, Express, Prisma ORM, PostgreSQL  
**Deployment:** Render (Server) + Netlify (Client)  
**Tools:** Prisma Studio, Postman, GitHub

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository
```
git clone https://github.com/Yamankhan23/bookit.git
cd bookit
```

### 2️⃣ Backend Setup
```
cd server
npm install
```

Create a `.env` file inside `server/`:
```
DATABASE_URL=postgresql://your_connection_string_here
PORT=8000
```

Run Prisma setup:
```
npm run migrate
npm run generate
npm run studio   # optional
```

Start the backend:
```
npm run dev
```

Backend available at:
```
http://localhost:8000
```

---

### 4️⃣ Frontend Setup
```
cd ../client
npm install
npm run dev
```

Frontend available at:
```
http://localhost:5173
```

---

### 5️⃣ Environment Variables (Frontend)
Create a `.env` file inside `client/`:
```
VITE_API_URL=https://bookitserver-ujuw.onrender.com
```

---

## 🌐 Live Deployment

| Service  | Platform | URL |
|-----------|-----------|------|
| Frontend  | Netlify   | [https://bookitclient.netlify.app](https://bookitclient.netlify.app) |
| Backend   | Render    | [https://bookitserver-ujuw.onrender.com](https://bookitserver-ujuw.onrender.com) |

---

## 🧪 API Testing

Example endpoint:
```
GET https://bookitserver-ujuw.onrender.com/experiences
```
Test via browser or tools like Postman or cURL.

---

## 👨‍💻 Developer

**Name:** Yaman Khan  
**Email:** [khanyaman2000@gmail.com](mailto:khanyaman2000@gmail.com)  
**GitHub:** [Yamankhan23](https://github.com/Yamankhan23)

---

## 💡 Notes & Best Practices

- Run both client and server locally to test full-stack functionality  
- Ensure PostgreSQL is active before running the backend  
- Use `npm run studio` for database exploration  
- Designed for robust performance and cross-device compatibility  

---

