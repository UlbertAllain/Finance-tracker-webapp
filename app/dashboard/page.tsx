"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Plus, Loader2, Menu, Download } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import SummaryCards from "@/components/dashboard/SummaryCards";
import AddTransactionModal from "@/components/dashboard/AddTransactionModal";
import Charts from "@/components/dashboard/Charts";
import TransactionList from "@/components/dashboard/TransactionList";
import { useTransactions, Transaction } from "@/hooks/useTransaction";
import { exportToCSV } from "@/lib/exportCSV";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { transactions, loading, addTransaction, deleteTransaction, updateTransaction, totalIncome, totalExpense, balance } = useTransactions();
  
  // STATE UNTUK SIDEBAR MOBILE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleEdit = (transaction: Transaction) => {
  setEditingTransaction(transaction);
  setIsModalOpen(true);
};

const handleCloseModal = () => {
  setIsModalOpen(false);
  setEditingTransaction(null); // Reset data edit kalau modal ditutup
};

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-emerald-400" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* KIRIM PROPS isOpen & onClose KE SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* UBAH ml-64 JADI md:ml-64, DAN p-8 JADI p-4 md:p-8 */}
      <main className="md:ml-64 p-4 md:p-8 min-h-screen transition-all">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* HAMBURGER BUTTON (Hanya muncul di HP) */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
            >
              <Menu size={22} className="text-gray-400" />
            </button>

            <div>
              <h1 className="text-xl text-white md:text-2xl font-bold">Dashboard</h1>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                {new Date().toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

                    <div className="flex items-center gap-2">
            {/* TOMBOL EXPORT CSV */}
            <button
              onClick={() => exportToCSV(transactions)}
              disabled={transactions.length === 0}
              className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 bg-white/5 text-white font-medium rounded-xl border border-white/10 hover:bg-white/10 transition-colors text-sm md:text-base disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Export</span>
            </button>

            {/* TOMBOL TAMBAH */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 bg-emerald-500 text-black font-medium rounded-xl hover:bg-emerald-400 transition-colors text-sm md:text-base"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Tambah</span>
            </button>
          </div>
        </div>

        {/* Summary */}
        <SummaryCards
          balance={balance}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />

        {/* Charts */}
        <div className="mt-6">
          <Charts transactions={transactions} />
        </div>

        {/* Transaction List */}
        <div className="mt-6">
          <TransactionList 
            transactions={transactions} 
            onDelete={deleteTransaction} 
            onEdit={handleEdit}/>
        </div>
      </main>

      {/* Modal */}
      <AddTransactionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal} // <-- GANTI onClose JADI handleCloseModal
          onAdd={addTransaction}
          onEdit={updateTransaction} // <-- TAMBAHKAN INI
          editingData={editingTransaction} // <-- TAMBAHKAN INI
        />
    </div>
  );
}