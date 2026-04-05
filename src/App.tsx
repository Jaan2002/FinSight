import { useState } from "react";
import { useApp } from "./context/AppContext";

import BalanceChart from "./components/BalanceChart";
import CategoryChart from "./components/CategoryChart";
import TransactionsTable from "./components/TransactionTable";
import AddTransactionForm from "./components/AddTransactionForm";
import EditModal from "./components/EditModal";
import DeleteModal from "./components/DeleteModal";
import Insights from "./components/Insights";

export default function App() {
  const { transactions, role, setRole, deleteTransaction } = useApp();

  const [page, setPage] = useState<"dashboard" | "transactions" | "insights">(
    "dashboard",
  );

  const [dark, setDark] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const income = transactions
    .filter((t: any) => t.type === "income")
    .reduce((a: number, b: any) => a + b.amount, 0);

  const expense = transactions
    .filter((t: any) => t.type === "expense")
    .reduce((a: number, b: any) => a + b.amount, 0);

  return (
    <div className={`flex h-screen ${dark ? "dark" : ""}`}>
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-6 hidden md:flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <img src="/logo.png" className="w-8 h-8" />
          <div>
            <h1 className="text-lg font-semibold">FinSight</h1>
            <p className="text-xs text-gray-400">Finance Dashboard</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 text-sm">
          {["dashboard", "transactions", "insights"].map((item) => (
            <button
              key={item}
              onClick={() => setPage(item as any)}
              className={`text-left px-3 py-2 rounded-lg transition ${
                page === item
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="mt-auto text-xs text-gray-400 pt-6">
          © 2026 FinSight
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold capitalize">{page}</h1>

          <div className="flex gap-3">
            {/* Dark Mode */}
            <button className="btn" onClick={() => setDark(!dark)}>
              {dark ? "Light" : "Dark"}
            </button>

            {/* Role */}
            <select
              className="input w-40"
              value={role}
              onChange={(e) => setRole(e.target.value as "admin" | "viewer")}
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Dashboard */}
        {page === "dashboard" && (
          <>
            {/* Form only for admin */}
            {role === "admin" && <AddTransactionForm />}

            {/* Summary */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card
                title="Balance"
                value={income - expense}
                color="bg-blue-500"
              />
              <Card title="Income" value={income} color="bg-green-500" />
              <Card title="Expense" value={expense} color="bg-red-500" />
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              <BalanceChart data={transactions} />
              <CategoryChart data={transactions} />
            </div>
          </>
        )}

        {/* Transactions */}
        {page === "transactions" && (
          <TransactionsTable
            setEditData={setEditData}
            setDeleteId={setDeleteId}
          />
        )}

        {/* Insights */}
        {page === "insights" && <Insights />}
      </div>

      {/* Edit Modal */}
      {editData && (
        <EditModal editData={editData} onClose={() => setEditData(null)} />
      )}

      {/* Delete Modal */}
      {deleteId && (
        <DeleteModal
          onConfirm={() => {
            deleteTransaction(deleteId);
            setDeleteId(null);
          }}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

// Card Component
const Card = ({ title, value, color }: any) => (
  <div className={`p-5 rounded-xl text-white shadow ${color}`}>
    <h3 className="text-sm opacity-80">{title}</h3>
    <p className="text-2xl font-bold mt-1">₹{value}</p>
  </div>
);
