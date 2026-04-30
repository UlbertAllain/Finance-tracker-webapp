"use client";

// ... sisanya biarkan apa adanya, jangan diubah
import { Transaction } from "@/hooks/useTransaction";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"; // FIX: pastikan ini 'recharts', bukan 'recaths'

interface ChartsProps {
  transactions: Transaction[];
}

const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#8b5cf6", "#ec4899"];

export default function Charts({ transactions }: ChartsProps) {
  const formatRp = (num: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);

  // Data untuk Pie Chart
  const expenseByCategory = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, t) => {
      const existing = acc.find((item) => item.name === t.category);
      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({ name: t.category, value: t.amount });
      }
      return acc;
    }, [] as { name: string; value: number }[]);

  // Data untuk Bar Chart
  const now = new Date();
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    return {
      month: d.toLocaleString("id-ID", { month: "short" }),
      year: d.getFullYear(),
      monthIndex: d.getMonth(),
    };
  }).reverse();

  const barData = last6Months.map(({ month, year, monthIndex }) => {
    const monthTransactions = transactions.filter((t) => {
      const tDate = new Date(t.date);
      return tDate.getMonth() === monthIndex && tDate.getFullYear() === year;
    });

    return {
      month,
      income: monthTransactions.filter((t) => t.type === "INCOME").reduce((s, t) => s + t.amount, 0),
      expense: monthTransactions.filter((t) => t.type === "EXPENSE").reduce((s, t) => s + t.amount, 0),
    };
  });

  // FIX: Custom Tooltip biar gak error typing
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-3 text-xs">
          <p className="text-gray-400 mb-2 font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="font-semibold">
              {entry.name}: {formatRp(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Bar Chart */}
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
        <h3 className="text-sm font-medium text-gray-400 mb-6">Income vs Expense (6 Bulan)</h3>
        {barData.some((d) => d.income > 0 || d.expense > 0) ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="month" tick={{ fill: "#666", fontSize: 12 }} />
              <YAxis 
                tickFormatter={(v: number) => `${(v / 1000)}k`} // FIX: kasih tipe 'number' pada parameter v
                tick={{ fill: "#666", fontSize: 12 }} 
              />
              {/* FIX: Ganti formatter dengan CustomTooltip */}
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[250px] flex items-center justify-center text-gray-600 text-sm">
            Belum ada data
          </div>
        )}
      </div>

      {/* Pie Chart */}
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
        <h3 className="text-sm font-medium text-gray-400 mb-6">Pengeluaran per Kategori</h3>
        {expenseByCategory.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={expenseByCategory}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {expenseByCategory.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              {/* FIX: Ganti formatter dengan CustomTooltip */}
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[250px] flex items-center justify-center text-gray-600 text-sm">
            Belum ada data pengeluaran
          </div>
        )}
        
        <div className="flex flex-wrap gap-3 mt-4">
          {expenseByCategory.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span className="text-xs text-gray-500">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}