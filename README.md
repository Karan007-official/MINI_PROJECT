# 🚀 SpendSmart - Expense Tracker App

A modern full-stack Expense Tracker Application built with React.js, Node.js, Express.js, MySQL, Axios, and Tailwind CSS. SpendSmart helps users track expenses, categorize spending, search/filter records, and manage personal finances with a clean dashboard UI.

---

## 📌 Overview
SpendSmart allows users to:
- Add expenses
- Delete expenses
- Categorize spending
- Search & filter records
- Track total spending in real-time dashboard

---

## ✨ Features

### 💰 Expense Management
- Add new expenses
- Delete expenses
- Category-based tracking
- Auto total calculation

### 🔍 Search & Filter
- Search by title
- Filter by category
- Real-time updates

### 📊 Dashboard
- Total spent calculation
- Total categories count
- Total records count

### 🎨 UI Features
- Modern dark UI
- Glassmorphism design
- Responsive layout
- Smooth animations

---

## 🛠️ Tech Stack

Frontend: React.js, Tailwind CSS, Axios, React Router DOM  
Backend: Node.js, Express.js  
Database: MySQL  

---

## 📂 Project Structure

SpendSmart/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseTable.jsx
│   │   │   ├── SummaryCards.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── Backend/
│   ├── server.js
│   ├── db.js
│   ├── .env
│   ├── package.json
│
└── README.md

---

## 🗄️ DATABASE COMMANDS

CREATE DATABASE task_manager;
USE task_manager;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  amount DECIMAL(10,2),
  category_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

---

## ⚙️ ENV FILE

DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD=your_mysql_password  
DB_NAME=task_manager  
PORT=5000  

---

## 🚀 SETUP

Backend:
cd backend
npm install
node server.js

Frontend:
cd frontend
npm install
npm run dev

---

## 🔌 API

POST /register  
POST /login  
GET /categories  
GET /expenses/:userId  
POST /expenses  
DELETE /expenses/:id  

---

## 📦 COMPONENTS

ExpenseForm  
ExpenseTable  
SummaryCards  
Navbar  

---

## 📄 PAGES

Login  
Register  
Dashboard  

---

## 🔒 SECURITY

bcrypt password hashing  
dotenv env protection  
secure API structure  
MySQL credential safety  

---

## 💡 FUTURE IMPROVEMENTS

JWT authentication  
Edit expense  
Charts dashboard  
Budget system  
CSV export  
Mobile app  

---

## 👨‍💻 DEVELOPER

Karan Choudhary  
Full Stack Developer  

React.js | Node.js | Express.js | MySQL | Tailwind CSS  

---

## ⭐ LICENSE

MIT License

 2026 Karan Choudhary

Permission is hereby granted, free of charge, to use, copy, modify, merge, publish, distribute...

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
