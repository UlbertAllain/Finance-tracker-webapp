"use client";

import { useState } from "react";
import { Transaction } from "@/hooks/useTransaction";
import { Trash2, TrendingUp, TrendingDown, Pencil } from "lucide-react";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (transaction: Transaction) => void; // <-- TAMBAHKAN INI
}

export default function TransactionList({ transactions, onDelete, onEdit }: TransactionListProps) {
  const [filter, setFilter] = useState<"ALL" | "INCOME" | "EXPENSE">("ALL");

  const filtered = filter === "ALL" ? transactions : transactions.filter((t) => t.type === filter);

  const formatRp = (num: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium text-gray-400">Riwayat Transaksi</h3>
        
        {/* Filter */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-white/5 rounded-lg">
          {(["ALL", "INCOME", "EXPENSE"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                filter === f ? "bg-white/10 text-white font-medium" : "text-gray-500"
              }`}
            >
              {f === "ALL" ? "Semua" : f === "INCOME" ? "Masuk" : "Keluar"}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-600 text-sm">
          Belum ada transaksi
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    t.type === "INCOME" ? "bg-emerald-500/10" : "bg-red-500/10"
                  }`}
                >
                  {t.type === "INCOME" ? (
                    <TrendingUp size={18} className="text-emerald-400" />
                  ) : (
                    <TrendingDown size={18} className="text-red-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-white font-medium">{t.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {t.category} • {formatDate(t.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p
                  className={`text-sm font-semibold ${
                    t.type === "INCOME" ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {t.type === "INCOME" ? "+" : "-"} {formatRp(t.amount)}
                </p>
                  <div className="flex items-center gap-2"> {/* UBAH gap-4 JADI gap-2 */}
                  <button
                    onClick={() => onEdit(t)} // <-- TAMBAHKAN INI
                    className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-emerald-400 transition-all">
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(t.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}