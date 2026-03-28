# 🌱 KrishiMitra AI

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Gemini AI](https://img.shields.io/badge/AI-Google_Gemini-8E75B2?style=for-the-badge&logo=google-gemini)](https://deepmind.google/technologies/gemini/)

**KrishiMitra AI** is an advanced, AI-driven agricultural companion designed to empower farmers and agricultural professionals with real-time insights, disease detection, and crop optimization strategies.

---

## 🚀 Key Features

### 🔍 Disease Detection
Harness the power of AI to identify crop diseases from images. Receive instant diagnoses and treatment recommendations to protect your yield.

### 📈 Smart Market Prices
Stay ahead of the curve with real-time tracking of crop market prices. Make informed decisions about when and where to sell your harvest.

### 🌾 Personalized Crop Recommendation
Not sure what to plant? Our AI analyzes environmental conditions to suggest the most profitable and sustainable crops for your specific region.

### ⛈️ Hyper-Local Weather
Get precise, real-time weather updates and forecasts to plan your agricultural activities with confidence.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion, Lucide Icons |
| **Backend** | Node.js, Express, MongoDB, Mongoose |
| **AI Engine** | Google Gemini 1.5 Flash API |
| **Storage** | Cloudinary (for Image Uploads) |
| **State Management**| Context API & React Hooks |

---

## 📦 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) Account
- [Google AI Studio](https://aistudio.google.com/) API Key (for Gemini)

### Step 1: Clone the Repository
```bash
git clone https://github.com/HarisHamza2445/KrishiMitra-AI.git
cd KrishiMitra-AI
```

### Step 2: Configure Environment Variables
Create a `.env` file in the `backend/` directory and add:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Step 3: Install Dependencies & Start
```bash
# Install root, frontend, and backend dependencies
npm install
npm install --prefix frontend
npm install --prefix backend

# Start the development servers
npm run dev --prefix frontend & npm run dev --prefix backend
```

---

## 🗺️ Project Structure

```text
📂 KrishiMitra AI
├── 📂 backend         # Node.js Express API
│   ├── 📂 controllers # Business Logic
│   ├── 📂 models      # MongoDB Schemas
│   └── 📂 routes      # Express Routes
├── 📂 frontend        # Vite + React UI
│   ├── 📂 src         # Components, Pages, Context
│   └── 📂 assets      # Visual resources
└── 📜 README.md       # Professional Documentation
```

---

## 👨‍💻 Developed By
**Haris Hamza**  
Empowering agriculture through technology.

---

*Made with ❤️ for the global farming community.*
