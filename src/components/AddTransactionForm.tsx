import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

export default function AddTransactionForm() {
  const { addOrUpdate, editing } = useApp();

  const [form, setForm] = useState<any>({
    id: "",
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  useEffect(() => {
    if (editing) {
      setForm({
        ...editing,
        amount: String(editing.amount),
      });
    }
  }, [editing]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    addOrUpdate({
      id: form.id || Date.now(),
      date: form.date,
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
    });

    setForm({ id: "", date: "", amount: "", category: "", type: "expense" });
  };

  return (
    <div className="card">
      <h2 className="section-title">
        {editing ? "Edit Transaction" : "Add Transaction"}
      </h2>

      <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <input className="input" type="date" value={form.date}
          onChange={(e)=>setForm({...form,date:e.target.value})} />

        <input className="input" type="number" placeholder="Amount"
          value={form.amount}
          onChange={(e)=>setForm({...form,amount:e.target.value})} />

        <input className="input" type="text" placeholder="Category"
          value={form.category}
          onChange={(e)=>setForm({...form,category:e.target.value})} />

        <select className="input"
          value={form.type}
          onChange={(e)=>setForm({...form,type:e.target.value})}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button className="btn col-span-2">
          {editing ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}