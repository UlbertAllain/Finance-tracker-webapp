"use client";

import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface SummaryCardsProps {
  balance: number;
  totalIncome: number;
  totalExpense: number;
}

export default function SummaryCards({ balance, totalIncome, totalExpense }: SummaryCardsProps) {
  const formatRp = (num: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);

  const cards = [
    {
      title: "Total Balance",
      value: formatRp(balance),
      icon: <Wallet size={22} />,
      color: balance >= 0 ? "text-emerald-400" : "text-red-400",
      bg: balance >= 0 ? "bg-emerald-500/10" : "bg-red-500/10",
    },
    {
      title: "Income",
      value: formatRp(totalIncome),
      icon: <TrendingUp size={22} />,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Expense",
      value: formatRp(totalExpense),
      icon: <TrendingDown size={22} />,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">{card.title}</p>
            <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center ${card.color}`}>
              {card.icon}
            </div>
          </div>
          <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}