# 🍔 Order Tracker App

This app allows users to place food orders and track their delivery status in real-time.  
It also features an **Admin Dashboard** to view and update order statuses.

---

## 🚀 Tech Stack

### Frontend (React Native + Expo)
- React Native (via Expo)
- Expo Router
- `@react-native-picker/picker` for dropdowns

### Backend (Node.js + Express)
- MongoDB Atlas (cloud database)
- REST API with Express.js

---

## ✅ Features Completed

- Checkout page with cart, address input & payment options
- Order submission to backend
- Status screen with auto-updating delivery stages
- Admin login screen
- Admin dashboard to view & update order status
- Auth-protected admin APIs
- Mobile & backend connected over local network (IP-based)
- Styled UI and proper routing

---

## 🧠 AI Tools Used

- **ChatGPT**:
  - Helped plan folder structure and logic
  - Wrote boilerplate backend API logic
  - Debugged connection errors and guided React Native component updates
- **GitHub Copilot**:
  - Suggested code completions for basic component logic

---

## 📷 Screenshots

All screenshots and screen recordings are available in the [`Screenshots & screenrecording`](./Screenshots%20&%20screenrecording) folder.

---

## 🛠 Setup & Run Instructions

### 1. Clone the Repo

```
git clone https://github.com/Mayanks-01/order-tracker-app.git

cd order-tracker-app


2. Backend Setup (Node + MongoDB)

cd backend
npm install

Create a .env file:
(PORT=5000
MONGO_URI=your_mongodb_uri
ADMIN_SECRET=secret123)

Start the backend:
node index.js

3. Frontend Setup (Expo)

cd ../order-tracker-app
npm install
npx expo start
Make sure to update IP in fetch(...) URLs (e.g. http://192.168.X.X:5000/...)

Use Expo Go app or Android Emulator to test

