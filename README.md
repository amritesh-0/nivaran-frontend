#  Crowdsourced Civic Issue Reporting and Resolution System

A mobile-first civic engagement platform that empowers citizens to report local issues (potholes, streetlights, garbage, etc.) in **real-time**, while enabling municipalities to **prioritize, route, and resolve** them efficiently.

---

##  Features

### Citizen App (Mobile/Web)
- 📸 **One-tap reporting**: Capture photo/video/voice note of an issue.
- 📍 **Auto-location tagging** via GPS.
- 📝 **Categorization** of issues (road, sanitation, utilities, etc.).
- 🔔 **Real-time updates**: confirmation → acknowledgment → resolution.
- 🗺️ **Interactive issue map** showing live reports across the city.

### Municipal Dashboard (Web)
- 📊 **Centralized issue dashboard** with filters by location, type, or priority.
- 🔄 **Automated routing** of reports to relevant departments.
- ✅ **Task assignment & status updates** for municipal staff.
- 🔔 **Notifications & escalations** to avoid unattended issues.
- 📈 **Analytics & trends**: hotspots, response times, and resolution performance.

---

##  Tech Stack

### Frontend
- **React (with Vite/CRA)** – component-driven UI
- **Tailwind CSS** – responsive styling
- **Framer Motion** – animations and interactions
- **Lottie** – engaging vector animations

### Backend
- **Node.js + Express** – REST API server
- **MongoDB** – database with geo-indexing for location queries
- **Multer / Cloud storage** – for photo & video uploads
- **JWT** – secure authentication

### DevOps / Other
- **Docker** (optional) for containerized deployments
- **CI/CD** pipeline ready (GitHub Actions / Jenkins)
- **Scalable architecture** with support for queues and microservices

---

##  Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/amritesh-0/nivaran-frontend.git
cd nivaran
```

### 2️⃣ Install Dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

### 3️⃣ Run the Application
```bash
# Frontend
cd frontend
npm run dev
```

Now open 👉 http://localhost:5173

---

## 📜 License
This project is licensed under the MIT License.

---

## 👨‍💻 Author
Built with ❤️ by Amritesh Kumar and NextArc Team SIH-2025 @ Manipal University.
