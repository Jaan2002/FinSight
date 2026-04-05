# FinSight – Finance Dashboard

A responsive and interactive finance dashboard built using React and TypeScript.  
This application helps users track transactions, visualize spending, and manage financial data with a clean and modern UI.

---

## Live Demo

👉 https://fintracker-portal.vercel.app/

---

## 📌 Features

### Dashboard Overview
- Summary cards (Balance, Income, Expense)
- Balance trend chart (time-based visualization)
- Spending breakdown (category-based visualization)

###  Transactions
- View all transactions
- Search by category or amount
- Filter by type (Income / Expense)
- Add new transactions
- Edit transactions (via modal)
- Delete transactions (with confirmation popup)

### Role-Based UI
- **Admin**: Can add, edit, delete transactions
- **Viewer**: Read-only access (form hidden)

### Insights
- Highest spending category
- Simple financial observations

###  UI & UX
- Clean and responsive design
- Dark mode support
- Sidebar navigation
- Smooth animations
- Empty state handling

---

## State Management

- Implemented using **React Context API**
- Centralized management of:
  - Transactions data
  - Filters
  - User role
  - Editing state

---

##  Data Persistence

- Uses **localStorage** to persist transactions
- Data remains even after page refresh

---

##  Tech Stack

- React + TypeScript
- Tailwind CSS
- Context API (state management)
- Recharts (data visualization)
- Framer Motion (animations)

---

##  Project Structure
src/
├── components/
├── context/
├── data/
├── App.tsx
└── main.tsx

**Install dependencies:**
npm install
**Run the app:**
npm run dev
