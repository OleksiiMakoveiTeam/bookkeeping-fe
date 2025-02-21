# 📌 Bookkeeping Automation Frontend

## 🚀 Project Overview

This is the frontend for the Bookkeeping Automation project. It provides a **React-based UI** to manage bookkeeping bots, track real-time task execution, and interact with the backend via **RTK Query**, **WebSockets**, and **Material UI**.

---

## 🛠️ Tech Stack

- **React** - UI Framework
- **TypeScript** - Type safety
- **Redux Toolkit (RTK Query)** - API fetching & state management
- **Material UI (MUI)** - UI components
- **WebSockets** - Real-time task updates
- **Vite** - Build tool for fast development
- **Zod** - Form validation with `react-hook-form`
- **React Router** - Navigation & routing
- **Use Form** - Form managing

---

## 📦 Installation & Setup

### **1️⃣ Clone the repository**

git clone https://github.com/OleksiiMakoveiTeam/bookkeeping-fe.git
cd frontend

### **2️⃣ Install dependencies**

yarn

Env is not required though usually would be.

### **4️⃣ Start the frontend**

yarn build && yarn preview

## 🖥️ Features

✔ **Create and manage bots**  
✔ **Assign bookkeeping tasks automatically**  
✔ **Real-time task updates via WebSockets**  
✔ **Task execution tracking with UI updates**  
✔ **RTK Query for efficient API fetching**  
✔ **Form validation with `zod` and `react-hook-form`**  
✔ **Material UI styling for modern UI**

## 📜 API Integration

This frontend connects to the backend via **RTK Query**.

### **Example API Calls**

#### Fetch all bots:

```ts
const { data: bots, isLoading } = useGetBotsQuery()
```
