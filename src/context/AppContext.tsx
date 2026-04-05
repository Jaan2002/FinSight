import { createContext, useContext, useState, useEffect } from "react";
import { transactionsData } from "../data/mockData";
import type { Transaction } from "../data/mockData";

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: any) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : transactionsData;
  });

  const [role, setRole] = useState<"admin" | "viewer">("viewer");
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [editing, setEditing] = useState<Transaction | null>(null);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addOrUpdate = (t: Transaction) => {
    if (editing) {
      setTransactions((prev) =>
        prev.map((item) => (item.id === t.id ? t : item))
      );
      setEditing(null);
    } else {
      setTransactions((prev) => [t, ...prev]);
    }
  };

  const deleteTransaction = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        role,
        setRole,
        filter,
        setFilter,
        editing,
        setEditing,
        addOrUpdate,
        deleteTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);