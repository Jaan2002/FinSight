export type Transaction = {
  id: number;
  date: string;
  amount: number;
  category: string;
  type: "income" | "expense";
};

export const transactionsData: Transaction[] = [
  { id: 1, date: "2026-04-01", amount: 50000, category: "Salary", type: "income" },
  { id: 2, date: "2026-04-02", amount: 15000, category: "Rent", type: "expense" },
  { id: 3, date: "2026-04-03", amount: 3000, category: "Groceries", type: "expense" },
  { id: 4, date: "2026-04-05", amount: 2000, category: "Transport", type: "expense" },
  { id: 5, date: "2026-04-07", amount: 2500, category: "Food", type: "expense" },
  { id: 6, date: "2026-04-10", amount: 5000, category: "Freelance", type: "income" },
];