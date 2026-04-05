import { useState } from "react";
import { useApp } from "../context/AppContext";
import type { Transaction } from "../data/mockData";

type Props = {
  setEditData: (t: Transaction) => void;
  setDeleteId: (id: number) => void;
};

export default function TransactionsTable({ setEditData, setDeleteId }: Props) {
  const { transactions, filter, setFilter } = useApp();

  const [search, setSearch] = useState("");

  // Filter + Search logic
  const filteredData = transactions.filter((t: Transaction) => {
    const matchFilter =
      filter === "all"
        ? true
        : t.type.toLowerCase().trim() === filter.toLowerCase().trim();

    const matchSearch =
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.amount.toString().includes(search);

    return matchFilter && matchSearch;
  });

  return (
    <div className="card">
      <h2 className="section-title">Transactions</h2>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          className="input"
          placeholder="Search by category or amount..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="input md:w-40"
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "all" | "income" | "expense")
          }
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map(
                (t: {
                  id: any;
                  date: any;
                  amount: any;
                  category: any;
                  type: any;
                }) => (
                  <tr key={t.id}>
                    <td>{t.date}</td>

                    <td className="font-medium">
                      ₹{t.amount.toLocaleString()}
                    </td>

                    <td>{t.category}</td>

                    <td
                      className={
                        t.type === "income"
                          ? "text-green-500 font-medium"
                          : "text-red-500 font-medium"
                      }
                    >
                      {t.type}
                    </td>

                    <td className="flex gap-3">
                      <button
                        onClick={() => setEditData(t)}
                        className="text-blue-500 hover:underline text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => setDeleteId(t.id)}
                        className="text-red-500 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ),
              )
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
