🌍 Bookit – Adventure Booking Platform

Bookit is a full-stack travel booking web app built with **React (Vite)** on the frontend and **Node.js + Express + Prisma + PostgreSQL** on the backend.  
It allows users to explore experiences, view available slots, and confirm bookings seamlessly.

---

🚀 Features

- Browse curated travel experiences with real-time data
- Dynamic slot availability for each experience
- Checkout with promo code support (SAVE10 / FLAT100)
- Fully responsive and optimized UI
- Secure REST API with PostgreSQL + Prisma ORM
- Deployed backend on **Render** and frontend on **Netlify**

---

🧩 Folder Structure

bookit/
├── client/ # React + Vite frontend
└── server/ # Express + Prisma backend


---

⚙️ Tech Stack

**Frontend:** React (Vite), TailwindCSS, Axios, React Router  
**Backend:** Node.js, Express.js, Prisma ORM, PostgreSQL  
**Deployment:** Render (Server) + Netlify (Client)

---

🛠️ Setup Instructions

1️⃣ Clone the Repository
```bash
git clone https://github.com/Yamankhan23/bookit.git
cd bookit

2️⃣ Backend Setup (server/)
cd server
npm install

Create a .env file inside the server/ folder and add:
DATABASE_URL=postgresql://your_connection_string_here
PORT=8000

Run Prisma migrations and generate the client:
npm run migrate
npm run generate
(Optional) View your database with Prisma Studio:
npm run studio

Start the backend server:
npm run dev
Server runs by default on
👉 http://localhost:8000

3️⃣ Frontend Setup (client/)
cd ../client
npm install
npm run dev


Frontend runs on
👉 http://localhost:5173

4️⃣ Environment Variable (Frontend)

Inside client/.env:

VITE_API_URL=https://bookitserver-ujuw.onrender.com

🌐 Live Deployment
Service	Platform	URL
Frontend	Netlify	https://bookitclient.netlify.app

Backend	Render	https://bookitserver-ujuw.onrender.com
🧪 API Testing

You can directly test REST APIs via browser or Postman.

Example:

GET https://bookitserver-ujuw.onrender.com/experiences

👨‍💻 Developer

Name: Yaman Khan
Email: khanyaman2000@gmail.com

GitHub: Yamankhan23

💡 Notes

Both frontend and backend can be run locally for testing.

Ensure PostgreSQL is live before running the backend.

Use npm run studio to visualize and verify seeded data.

Designed to be pixel-perfect on desktop and mobile-responsive across devices.

🧭 A full-stack MERN-style project demonstrating modern web development workflow with clean architecture, database integration, and responsive UI.























