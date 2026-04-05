import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import type { Transaction } from "../data/mockData";

export default function EditModal({
  editData,
  onClose,
}: {
  editData: Transaction | null;
  onClose: () => void;
}) {
  const { addOrUpdate } = useApp();

  const [form, setForm] = useState<any>({
    id: "",
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
        amount: String(editData.amount),
      });
    }
  }, [editData]);

  if (!editData) return null;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    addOrUpdate({
      id: form.id,
      date: form.date,
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="card w-full max-w-md">

        <h2 className="section-title">Edit Transaction</h2>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input className="input" type="date"
            value={form.date}
            onChange={(e)=>setForm({...form,date:e.target.value})}
          />

          <input className="input" type="number"
            value={form.amount}
            onChange={(e)=>setForm({...form,amount:e.target.value})}
          />

          <input className="input" type="text"
            value={form.category}
            onChange={(e)=>setForm({...form,category:e.target.value})}
          />

          <select className="input"
            value={form.type}
            onChange={(e)=>setForm({...form,type:e.target.value})}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <div className="flex gap-2">
            <button className="btn w-full">Update</button>

            <button
              type="button"
              onClick={onClose}
              className="btn bg-gray-400 w-full"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}